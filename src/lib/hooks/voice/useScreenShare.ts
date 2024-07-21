import { useAuthStore } from '@/lib/stores/useAuthStore';
import useVoiceStateStore from '@/lib/stores/voice/useVoiceStateStore';
import useVoiceStore from '@/lib/stores/voice/useVoiceControllerStore';
import { Publisher } from 'openvidu-browser';
import { useState } from 'react';

const useScreenShare = () => {
  const { OV, session, publisher, setPublisher } = useVoiceStateStore();
  const myUserName = useAuthStore((state) => state.user?.username);

  const [originalPublisher, setOriginalPublisher] = useState<
    Publisher | undefined
  >(undefined);

  const { screenShareOn, setScreenShareOn, videoOn, setVideoOn } =
    useVoiceStore();

  const startScreenShare = () => {
    if (videoOn) {
      setVideoOn(false);
    }

    // 기존 퍼블리셔 unpublish 및 저장
    if (publisher && session) {
      setOriginalPublisher(publisher);
      session.unpublish(publisher);
      setPublisher(undefined);
    }

    const screenPublisher = OV?.initPublisher(`${myUserName}'s screen`, {
      videoSource: 'screen',
      publishAudio: false,
    });

    if (screenPublisher && session) {
      screenPublisher.on('accessAllowed', function () {
        session.publish(screenPublisher);
        setPublisher(screenPublisher);
        setScreenShareOn(true);
      });

      screenPublisher.on('accessDenied', function () {
        console.log('Screen sharing access denied');
      });
    }
  };

  const stopScreenShare = () => {
    if (publisher && session && screenShareOn) {
      session.unpublish(publisher);

      setPublisher(undefined);
      setScreenShareOn(false);

      // 기존 비디오 스트림 재개
      if (originalPublisher) {
        session.publish(originalPublisher);
        setPublisher(originalPublisher);
        setOriginalPublisher(undefined);
      } else {
        const videoPublisher = OV?.initPublisher(myUserName, {
          videoSource: undefined,
          publishAudio: true,
        });

        if (videoPublisher && session) {
          session.publish(videoPublisher);
          setPublisher(videoPublisher);
        }
      }
    }
  };

  return { startScreenShare, stopScreenShare };
};

export default useScreenShare;
