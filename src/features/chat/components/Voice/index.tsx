import { spacing } from '@/constants/spacing';
import useRoomStore from '@/stores/useRoomStore';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { PiPhoneDisconnectFill } from 'react-icons/pi';
import useVoiceRoom from '../../hooks/Voice/useVoiceRoom';
import Container from '../Container';
import VideoContainer from './VoiceBody/VideoContainer';
import Controller from './VoiceController/Controller';
// import { BsFillCameraVideoOffFill } from "react-icons/bs";

const VoiceSection = () => {
  const { name } = useRoomStore((state) => state.currentChannelInfo);

  const {
    session,
    joinSession,
    leaveSession,
    switchCamera,
    mainStreamManager,
    publisher,
    handleMainVideoStream,
    subscribers,
  } = useVoiceRoom();

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
          gap={spacing.gutter}
        >
          <Text color={'white'} fontWeight={900} fontSize={'2rem'}>
            {name}
          </Text>
          <Text color={'white'} fontWeight={200} fontSize={'1.4rem'}>
            {'No one is currently in voice.'}
          </Text>
          <Button onClick={joinSession} fontSize={'1.8rem'} mt={'1rem'}>
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
              onClick={switchCamera}
              label={'Switch Camera'}
              icon={BsFillCameraVideoFill}
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
