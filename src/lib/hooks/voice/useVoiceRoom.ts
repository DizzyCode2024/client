import { axiosInstance } from '@/lib/api';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import useRoomStore from '@/lib/stores/useRoomStore';
import useVoiceStore from '@/lib/stores/voice/useVoiceControllerStore';
import useVoiceStateStore from '@/lib/stores/voice/useVoiceStateStore';
import { Device, OpenVidu, Publisher, StreamManager } from 'openvidu-browser';
import { useCallback, useState } from 'react';
import useHandleController from './useHandleController';

const useVoiceRoom = () => {
  const {
    OV,
    setOV,
    session,
    setSession,
    setPublisher,
    subscribers,
    setSubscribers,
    mainStreamManager,
    setMainStreamManager,
  } = useVoiceStateStore();

  const [currentVideoDevice, setCurrentVideoDevice] = useState<
    Device | undefined
  >(undefined);

  const myUserName = useAuthStore((state) => state.user?.username);
  const mySessionId = useRoomStore(
    (state) => state.currentChannelPath.channelId,
  );
  const { videoOn, audioOn, screenShareOn } = useVoiceStore();
  const { leaveSession } = useHandleController();

  const handleMainVideoStream = (stream: StreamManager) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = useCallback(
    (streamManager: StreamManager) => {
      const prevSubscribers = subscribers;
      const index = prevSubscribers.indexOf(streamManager, 0);
      if (index > -1) {
        prevSubscribers.splice(index, 1);
        setSubscribers([...prevSubscribers]);
      }

      // setSubscribers((prevSubscribers) =>
      //   prevSubscribers.filter(
      //     (subscriber) =>
      //       subscriber.stream.connection.connectionId !==
      //       streamManager.stream.connection.connectionId,
      //   ),
      // );
    },
    [subscribers],
  );

  const joinSession = useCallback(() => {
    console.log('=========JOIN=========');
    if (session) {
      leaveSession(); // 기존 세션을 떠나고 새로운 세션을 초기화
    }
    const OVInstance = new OpenVidu();
    OVInstance.enableProdMode();

    setOV(OVInstance);

    const mySession = OVInstance.initSession();
    setSession(mySession);

    // connection 메소드 내부에 이벤트 수신 처리
    //    session에 참여한 사용자 추가
    mySession.on('streamCreated', (event) => {
      console.log(
        '!!!!!!!STREAM CREATED',
        JSON.parse(event.stream.connection.data).clientData,
      );
      const newSubscriber = mySession.subscribe(
        event.stream,
        JSON.parse(event.stream.connection.data).clientData,
      );

      const prevSubscribers = subscribers;
      setSubscribers([...prevSubscribers, newSubscriber]);
    });

    //    session에서 disconnect한 사용자 삭제
    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
      console.log(
        '>>> DISCONNECT: ',
        event.stream.typeOfVideo,
        event.stream.streamManager,
      );

      // if (event.stream.typeOfVideo === 'CUSTOM') {
      //   deleteSubscriber(event.stream.streamManager);
      // } else {
      //   setDestroyedStream(event.stream.streamManager);
      //   setCheckMyScreen(true);
      // }
    });

    //    예외처리
    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    const getToken = async () => {
      const sessionId = await createSession(mySessionId.toString());
      console.log('>>SESSION ID: ', sessionId, mySessionId);

      const token = await createToken(sessionId);
      return token;
    };

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // user media 객체 생성
          OVInstance.getUserMedia({
            audioSource: false,
            videoSource: undefined,
            resolution: '1280x720',
            frameRate: 10,
          }).then((mediaStream) => {
            const videoTrack = mediaStream.getVideoTracks()[0];
            const publisherInstance = OVInstance.initPublisher(myUserName, {
              audioSource: undefined,
              videoSource: screenShareOn ? 'screen' : videoTrack,
              publishAudio: audioOn,
              publishVideo: videoOn,
              insertMode: 'APPEND',
              mirror: false,
              // resolution: '1280x720',
              // frameRate: 10,
            });
            // publish
            publisherInstance.once('accessAllowed', () => {
              mySession.publish(publisherInstance);
              setPublisher(publisherInstance);
              setMainStreamManager(publisherInstance);
            });
          });
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        });
    });
  }, [leaveSession, mySessionId, myUserName, session]);

  const createSession = async (mySessionId: string) => {
    console.log('CREATE SESSION', mySessionId);
    try {
      const response = await axiosInstance.post(`/api/sessions`, {
        customSessionId: mySessionId,
      });
      console.log('CREATE SESSION', response.data);
      return response.data; // The sessionId
    } catch (e) {
      console.log('ERROR AT CREATING SESSION', e);
      return null;
    }
  };

  const createToken = async (sessionId: any) => {
    try {
      const response = await axiosInstance.post(
        `/api/sessions/${sessionId}/connections`,
        {},
      );

      console.log('CREATE TOKEN', response.data);
      return response.data; // The token
    } catch (e) {
      console.log('ERROR AT CREATING TOKEN', e);
      return null;
    }
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

          if (mainStreamManager instanceof Publisher) {
            await session?.unpublish(mainStreamManager);
          }
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
    handleMainVideoStream,
  };
};

export default useVoiceRoom;
