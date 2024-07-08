import styled from 'styled-components';
import { StreamManager } from 'openvidu-browser';
import OpenViduVideoComponent from './OVVideoComponent';

const Name = styled.div`
  position: absolute;
  background: #f8f8f8;
  padding-left: 5px;
  padding-right: 5px;
  color: #777777;
  font-weight: bold;
  border-bottom-right-radius: 4px;
`;

const UserVideoComponent = ({
  streamManager,
}: {
  streamManager: StreamManager;
}) => {
  const getNicknameTag = () => {
    if (
      streamManager &&
      streamManager.stream &&
      streamManager.stream.connection &&
      streamManager.stream.connection.data
    ) {
      // 사용자 닉네임을 얻기 위해 connection data를 파싱
      const nickname = JSON.parse(
        streamManager.stream.connection.data,
      ).clientData;
      return <div>{nickname}</div>;
    }
    return <div>{'Unknown'}</div>; // 기본 값 또는 null 체크를 통과하지 못한 경우
  };

  if (!streamManager) {
    return <div>{'Loading...'}</div>; // streamManager가 null인 경우
  }

  return (
    <div>
      <Name>{getNicknameTag()}</Name>
      <OpenViduVideoComponent streamManager={streamManager} />
    </div>
  );
};

export default UserVideoComponent;
