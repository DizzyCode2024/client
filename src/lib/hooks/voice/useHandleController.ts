import useVoiceStateStore from '@/lib/stores/voice/useVoiceStateStore';
import useVideoStore from '@/lib/stores/voice/useVoiceStore';
import { useCallback } from 'react';

const useHandleController = () => {
  const {
    setOV,
    session,
    publisher,
    setSession,
    setSubscribers,
    setMainStreamManager,
    setPublisher,
  } = useVoiceStateStore();
  const { audioOn, setAudioOn, videoOn, setVideoOn } = useVideoStore();

  const toggleAudio = useCallback(() => {
    if (publisher) {
      publisher.publishAudio(!audioOn);
      setAudioOn(!audioOn);
    }
  }, [publisher, audioOn]);

  const toggleVideo = useCallback(() => {
    if (publisher) {
      publisher.publishVideo(!videoOn);
      setVideoOn(!videoOn);
    }
  }, [publisher, videoOn]);

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

  return { toggleAudio, toggleVideo, leaveSession };
};

export default useHandleController;
