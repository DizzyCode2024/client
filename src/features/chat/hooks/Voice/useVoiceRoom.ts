import { useAuthStore } from '@/stores/useAuthStore';
import useRoomStore from '@/stores/useRoomStore';
import { BASE_URL } from '@/utils/config';
import axios from 'axios';
import {
  Device,
  OpenVidu,
  Publisher,
  Session,
  StreamManager,
} from 'openvidu-browser';
import { useCallback, useEffect, useState } from 'react';

const useVoiceRoom = () => {
  const [OV, setOV] = useState<OpenVidu | undefined>(undefined);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<
    Publisher | undefined
  >(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<
    Device | undefined
  >(undefined);

  const myUserName = useAuthStore((state) => state.user?.username);
  const mySessionId = useRoomStore((state) => state.currentChannelInfo.name);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    setOV(undefined);
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  useEffect(() => {
    const onbeforeunload = () => {
      leaveSession();
    };

    window.addEventListener('beforeunload', onbeforeunload);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, [session, leaveSession]);

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((subscriber) => subscriber !== streamManager),
    );
  };

  const joinSession = useCallback(() => {
    const OVInstance = new OpenVidu();
    setOV(OVInstance);

    const mySession = OVInstance.initSession();
    setSession(mySession);

    mySession.on('streamCreated', (event: any) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    const getToken = async () => {
      const sessionId = await createSession(mySessionId);
      console.log('>>>>>>SESSION ID', sessionId, mySessionId);

      const token = await createToken(sessionId);
      return token;
    };

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          const publisherInstance = await OVInstance.initPublisherAsync(
            undefined,
            {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: '640x480',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            },
          );

          mySession.publish(publisherInstance);

          const devices = await OVInstance.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput',
          );
          const currentVideoDeviceId = publisherInstance.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId,
          );

          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisherInstance);
          setPublisher(publisherInstance);
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        });
    });
  }, [myUserName, mySessionId]);

  const createSession = async (mySessionId: string) => {
    const response = await axios.post(
      `${BASE_URL}/api/sessions`,

      { customSessionId: mySessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    console.log('CREATE SESSION', response.data);

    return response.data; // The sessionId
  };

  const createToken = async (sessionId: any) => {
    const response = await axios.post(
      `${BASE_URL}/api/sessions/${sessionId}/connections`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    console.log('CREATE TOKEN', response.data);
    return response.data; // The token
  };

  const switchCamera = useCallback(async () => {
    try {
      if (!OV || !currentVideoDevice) return;

      const devices = await OV.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId,
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await session?.unpublish(mainStreamManager!);
          await session?.publish(newPublisher);
          setCurrentVideoDevice(newVideoDevice[0]);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [OV, currentVideoDevice, mainStreamManager, session]);

  return {
    joinSession,
    switchCamera,
    leaveSession,
    subscribers,
    publisher,
    mainStreamManager,
    handleMainVideoStream,
  };
};

export default useVoiceRoom;
