import useRoomStore from '@/stores/useRoomStore';
import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import styled from 'styled-components';
import useVoiceRoom from '../../hooks/Voice/useVoiceRoom';
import Container from '../Container';
import UserVideoComponent from './VoiceBody/VideoComponent';

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

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
    console.log('>>SESSION:', session);
  }, [subscribers, session]);

  return (
    <Container>
      {session === undefined ? (
        <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
          <Button onClick={joinSession}>{'Join'}</Button>
        </Flex>
      ) : null}
      {session !== undefined ? (
        <div>
          <div id={'session-header'}>
            <h1 id={'session-title'}>{name}</h1>
            <input
              className={'btn btn-large btn-danger'}
              type={'button'}
              id={'buttonLeaveSession'}
              onClick={leaveSession}
              value={'Leave session'}
            />
            <input
              className={'btn btn-large btn-success'}
              type={'button'}
              id={'buttonSwitchCamera'}
              onClick={switchCamera}
              value={'Switch Camera'}
            />
          </div>
          <VideoContainer>
            {mainStreamManager !== undefined ? (
              <UserVideoComponent
                streamManager={mainStreamManager}
                type={'manager'}
              />
            ) : null}
            <div>
              {publisher !== undefined ? (
                <div onClick={() => handleMainVideoStream(publisher)}>
                  <UserVideoComponent streamManager={publisher} type={'pub'} />
                </div>
              ) : null}
              {subscribers.map((sub) => (
                <div key={sub.id}>
                  <div>{'SUB'}</div>
                  <div onClick={() => handleMainVideoStream(sub)}>
                    <span>{sub.id}</span>
                    <UserVideoComponent streamManager={sub} type={'sub'} />
                  </div>
                </div>
              ))}
            </div>
          </VideoContainer>
        </div>
      ) : null}
    </Container>
  );
};

export default VoiceSection;
