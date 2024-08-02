import useHandleController from '@/lib/hooks/voice/useHandleController';
import useScreenShare from '@/lib/hooks/voice/useScreenShare';
import useVoiceControllerStore from '@/lib/stores/voice/useVoiceControllerStore';
import { BiSolidMicrophone, BiSolidMicrophoneOff } from 'react-icons/bi';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from 'react-icons/bs';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { PiPhoneDisconnectFill } from 'react-icons/pi';
import GlobalController from './Base';

const Controller = () => {
  const { videoOn, audioOn, screenShareOn } = useVoiceControllerStore();
  const { toggleAudio, toggleVideo, leaveSession } = useHandleController();
  const { startScreenShare, stopScreenShare } = useScreenShare();
  return (
    <GlobalController>
      <GlobalController.Button
        onClick={toggleVideo}
        label={videoOn ? 'Turn Off Camera' : 'Turn On Camera'}
        icon={videoOn ? BsFillCameraVideoFill : BsFillCameraVideoOffFill}
      />
      <GlobalController.Button
        onClick={toggleAudio}
        label={audioOn ? 'Turn Off Microphone' : 'Turn On Microphone'}
        icon={audioOn ? BiSolidMicrophone : BiSolidMicrophoneOff}
      />
      <GlobalController.Button
        onClick={screenShareOn ? stopScreenShare : startScreenShare}
        label={screenShareOn ? 'Stop Screen Share' : 'Screen Share'}
        icon={screenShareOn ? MdScreenShare : MdStopScreenShare}
      />
      <GlobalController.Button
        onClick={leaveSession}
        label={'Disconnect'}
        icon={PiPhoneDisconnectFill}
      />
    </GlobalController>
  );
};

export default Controller;
