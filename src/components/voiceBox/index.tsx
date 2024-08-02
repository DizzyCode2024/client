import { QUERY_KEYS } from '@/lib/api';
import { spacing } from '@/lib/constants';
import useHandleController from '@/lib/hooks/voice/useHandleController';
import useScreenShare from '@/lib/hooks/voice/useScreenShare';
import useRoomStore from '@/lib/stores/useRoomStore';
import useVoiceControllerStore from '@/lib/stores/voice/useVoiceControllerStore';
import { IRoom } from '@/types';
import { Box, Flex } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { BiSolidMicrophone, BiSolidMicrophoneOff } from 'react-icons/bi';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from 'react-icons/bs';
import { GiNetworkBars } from 'react-icons/gi';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { PiPhoneDisconnectFill } from 'react-icons/pi';
import GlobalController from './Controller';

const VoiceBox = () => {
  const [roomName, setRoomName] = useState<string>('');
  const {
    currentChannelInfo: { name: channelName },
    currentChannelPath: { roomId },
  } = useRoomStore();

  const queryClient = useQueryClient();
  const rooms: IRoom[] =
    queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS) || [];

  useEffect(() => {
    rooms?.forEach((room) => {
      if (room.roomId === roomId) {
        setRoomName(room.roomName);
      }
    });
  }, [rooms, roomId]);

  const { videoOn, audioOn, screenShareOn } = useVoiceControllerStore();
  const { toggleAudio, toggleVideo, leaveSession } = useHandleController();
  const { startScreenShare, stopScreenShare } = useScreenShare();
  return (
    <Box
      width={'full'}
      bg={'gray.800'}
      borderBottom={'1px'}
      borderColor={'gray.700'}
      p={spacing.small}
      pt={spacing.small}
    >
      <Flex
        color={'green'}
        fontSize={'sm'}
        fontWeight={'bold'}
        gap={spacing.small}
        alignItems={'flex-end'}
        pb={spacing.small}
      >
        <GiNetworkBars />
        {'Voice Connected'}
      </Flex>
      <Box fontSize={'small'} color={'gray.500'} pb={spacing.small}>
        {channelName}
        {' / '}
        {roomName}
      </Box>
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
    </Box>
  );
};

export default VoiceBox;
