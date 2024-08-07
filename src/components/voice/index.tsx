import { spacing } from '@/lib/constants';
import useHandleController from '@/lib/hooks/voice/useHandleController';
import useScreenShare from '@/lib/hooks/voice/useScreenShare';
import useRoomStore from '@/lib/stores/useRoomStore';
import useConnectedVoiceStore from '@/lib/stores/voice/useConnectedVoiceStore';
import useVoiceControllerStore from '@/lib/stores/voice/useVoiceControllerStore';
import useVoiceStateStore from '@/lib/stores/voice/useVoiceStateStore';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiSolidMicrophone, BiSolidMicrophoneOff } from 'react-icons/bi';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from 'react-icons/bs';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { PiPhoneDisconnectFill } from 'react-icons/pi';
import useVoiceRoom from '../../lib/hooks/voice/useVoiceRoom';
import Container from '../chat/DragFileContainer';
import VideoContainer from './VoiceBody/VideoContainer';
import Controller from './VoiceController/Controller';

const VoiceSection = () => {
  const { videoOn, audioOn, screenShareOn } = useVoiceControllerStore();

  const { joinSession, handleMainVideoStream } = useVoiceRoom();

  const { session, publisher, mainStreamManager, subscribers } =
    useVoiceStateStore();

  const {
    currentChannelPath: { roomId, categoryId, channelId },
    currentChannelInfo: { name, type },
  } = useRoomStore();
  const { setConnectedVoicePath, setConnectedVoiceInfo } =
    useConnectedVoiceStore();

  const { toggleAudio, toggleVideo, leaveSession } = useHandleController();
  const { startScreenShare, stopScreenShare } = useScreenShare();

  // useEffect(() => {
  //   console.log('=======MOUNT=======');
  //   // window.addEventListener('beforeunload', onbeforeunload);
  //   return () => {
  //     console.log('=======UNMOUNT=======');
  //     if (session) {
  //       leaveSession();
  //     }
  //   };
  // }, [session, leaveSession]);

  const handleJoinSession = () => {
    joinSession();
    setConnectedVoicePath({ roomId, categoryId, channelId });
    setConnectedVoiceInfo({ name, type });
  };

  useEffect(() => {
    console.log('>> SUBSCRIBERS:', subscribers);
    console.log('>> SESSION:', session);
    console.log('>> MAIN STREAM MANAGER:', mainStreamManager);
    console.log('>> PUBLISHER:', publisher);
  }, [subscribers, session, mainStreamManager, publisher]);

  return (
    <Container>
      {session === undefined ? (
        <Flex
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          gap={spacing.padding}
        >
          <Text color={'white'} fontWeight={900} fontSize={'1.4rem'}>
            {name}
          </Text>
          <Text color={'white'} fontWeight={200} fontSize={'1.2rem'}>
            {'No one is currently in voice.'}
          </Text>
          <Button onClick={handleJoinSession} fontSize={'1.3rem'} mt={'1rem'}>
            {'Join Voice'}
          </Button>
        </Flex>
      ) : (
        <Flex direction={'column'} flex={1} position={'relative'}>
          {/* {mainStreamManager !== undefined ? (
              <UserVideoComponent streamManager={mainStreamManager} />
            ) : null} */}

          {publisher && subscribers && (
            <VideoContainer
              publisher={publisher}
              subscribers={subscribers}
              handleMainVideoStream={handleMainVideoStream}
            />
          )}

          <Controller>
            <Controller.Button
              onClick={toggleVideo}
              isOn={videoOn}
              label={videoOn ? 'Turn Off Camera' : 'Turn On Camera'}
              icon={videoOn ? BsFillCameraVideoFill : BsFillCameraVideoOffFill}
            />
            <Controller.Button
              onClick={toggleAudio}
              isOn={audioOn}
              label={audioOn ? 'Turn Off Microphone' : 'Turn On Microphone'}
              icon={audioOn ? BiSolidMicrophone : BiSolidMicrophoneOff}
            />
            <Controller.Button
              onClick={screenShareOn ? stopScreenShare : startScreenShare}
              isOn={screenShareOn}
              label={screenShareOn ? 'Stop Screen Share' : 'Screen Share'}
              icon={screenShareOn ? MdScreenShare : MdStopScreenShare}
            />
            <Controller.RedButton
              onClick={leaveSession}
              label={'Disconnect'}
              icon={PiPhoneDisconnectFill}
            />
          </Controller>
        </Flex>
      )}
    </Container>
  );
};

export default VoiceSection;
