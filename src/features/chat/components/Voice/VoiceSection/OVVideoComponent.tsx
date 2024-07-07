import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
  height: auto;
  float: left;
  cursor: pointer;
`;

const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <Video autoPlay ref={videoRef} />;
};

export default OpenViduVideoComponent;
