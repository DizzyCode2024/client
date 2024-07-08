import styled from 'styled-components';
import { StreamManager } from 'openvidu-browser';
import OpenViduVideoComponent from './OVVideoComponent';

const Stream = styled.div`
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
  type,
}: {
  streamManager: StreamManager;
  type: string;
}) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    console.log('====', streamManager.stream.connection.data, type);
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <OpenViduVideoComponent streamManager={streamManager} />
          <Stream>
            <p style={{ margin: 0 }}>{getNicknameTag()}</p>
          </Stream>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
