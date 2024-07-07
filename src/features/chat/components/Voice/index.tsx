import useRoomStore from '@/stores/useRoomStore';
import { useEffect } from 'react';
import styled from 'styled-components';
import Container from '../Container';
import UserVideoComponent from './VoiceSection/VideoComponent';
import useVoiceRoom from '../../hooks/Voice/useVoiceRoom';

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const VoiceSection = () => {
  const { name } = useRoomStore((state) => state.currentChannelInfo);

  const {
    joinSession,
    leaveSession,
    switchCamera,
    mainStreamManager,
    publisher,
    handleMainVideoStream,
    subscribers,
  } = useVoiceRoom();

  useEffect(() => {
    joinSession();
    return () => {
      leaveSession();
    };
  }, [joinSession, leaveSession]);

  useEffect(() => {
    console.log('====', subscribers);
  }, [subscribers]);

  return (
    <Container>
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
          <UserVideoComponent streamManager={mainStreamManager} />
        ) : null}
        <div>
          {publisher !== undefined ? (
            <div onClick={() => handleMainVideoStream(publisher)}>
              <UserVideoComponent streamManager={publisher} />
            </div>
          ) : null}
          {subscribers.map((sub) => (
            <>
              <div>{'SUB'}</div>
              <div
                key={sub.id}
                className={'stream-container col-md-6 col-xs-6'}
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            </>
          ))}
        </div>
      </VideoContainer>
    </Container>
  );
};

export default VoiceSection;
