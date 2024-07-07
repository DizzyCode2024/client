import useSocketStore from '@/stores/useSocketStore';
import { useEffect, useRef, useState } from 'react';
import { ISignalingMessage } from '../types';
import { useDestination } from './useDestination';

const useVoiceCall = () => {
  const { client, isConnected } = useSocketStore();
  const { VoiceTopic } = useDestination();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const handleSignalingMessage = async (message: ISignalingMessage) => {
    if (message.type === 'offer') {
      // 5. B는 서버로부터 받은 A의 offer 정보를 remoteDescription으로 설정한다.
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(message.offer),
      );
      // 7. B는 answer를 생성하는데, 이때 answer에는 B의 media 정보를 담고 있는 SDP가 담겨 있다.
      const answer = await peerConnectionRef.current?.createAnswer();
      // 8. B는 answer을 localDescription으로 설정한다.
      await peerConnectionRef.current?.setLocalDescription(answer);
      // 9. B는 answer를 서버로 전송한다.
      if (answer) {
        sendMessage(VoiceTopic, { type: 'answer', answer });
      }
    } else if (message.type === 'answer') {
      // 10. A는 서버로부터 받은 B의 answer 정보를 remoteDescription으로 설정한다.
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(message.answer),
      );
    } else if (message.type === 'candidate') {
      // 13. A or B는 서버로부터 받은 ICE candidate 정보를 remoteDescription으로 설정한다.
      await peerConnectionRef.current?.addIceCandidate(
        new RTCIceCandidate(message.candidate),
      );
    }
  };

  const sendMessage = (destination: string, body: ISignalingMessage) => {
    if (client && isConnected) {
      client.publish({ destination, body: JSON.stringify(body) });
    }
  };

  const initiateCall = async () => {
    // 2. A는 offer를 생성하는데, offer에는 localStream을 담고 있는 SDP가 담겨 있다.
    const offer = await peerConnectionRef.current?.createOffer();
    // 3. A는 생성한 offer를 localDescription으로 설정한다.
    await peerConnectionRef.current?.setLocalDescription(offer);
    // 4. A는 offer를 서버로 전송한다.
    if (offer) {
      sendMessage(VoiceTopic, { type: 'offer', offer });
    }
  };

  useEffect(() => {
    if (isConnected) {
      // 1. A는 자신의 media 정보를 stream에 추가한다.
      const constraints = { video: true, audio: true };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          setLocalStream(stream);
        })
        .catch((error) => {
          console.error('Error accessing media devices.', error);
        });

      // 11. Create a new RTCPeerConnection
      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      // 12. ICE candidate 정보를 서버로 전송한다.
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendMessage(VoiceTopic, {
            type: 'candidate',
            candidate: event.candidate,
          });
        }
      };

      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      // Add local stream to peer connection
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peerConnectionRef.current?.addTrack(track, localStream);
        });
      }

      // Subscribe to signaling messages
      const subscription = client?.subscribe(VoiceTopic, (message) => {
        handleSignalingMessage(JSON.parse(message.body));
      });

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
    return undefined;
  }, [
    isConnected,
    localStream,
    client,
    VoiceTopic,
    handleSignalingMessage,
    sendMessage,
  ]);

  return { localStream, remoteStream, initiateCall };
};

export default useVoiceCall;
