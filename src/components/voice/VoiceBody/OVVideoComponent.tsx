import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StreamManager } from 'openvidu-browser';

const Video = styled.video`
  width: 100%;
  height: auto;
  float: left;
  cursor: pointer;
`;

const OpenViduVideoComponent = ({
  streamManager,
}: {
  streamManager: StreamManager;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  if (!streamManager) {
    return null; // streamManager가 null인 경우 컴포넌트를 렌더링하지 않음
  }

  return <Video autoPlay ref={videoRef} />;
};

export default OpenViduVideoComponent;
