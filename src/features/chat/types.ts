// import { RemoteTrackPublication } from 'livekit-client';
import { UserId } from '../auth/types';

export type Content = string;

export interface IFile {
  name: string;
  type: string;
  size: number;
  preview: string;
  file: File;
}

export interface IFileState {
  files: IFile[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileToRemove: IFile) => void;
  clearFiles: () => void;
}

export interface ISendChatPayload {
  senderId: UserId;
  content: Content;
  files?: IFile[];
}

export interface IReceiveChatPayload {
  messageId?: string;
  senderUsername: string;
  content: Content;
  timestamp: string;
}

// VIDEO CALL
//    OpenVidu
export type TrackInfo = {
  // trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

//    1:1
export interface OfferMessage {
  type: 'offer';
  offer: RTCSessionDescriptionInit;
}

export interface AnswerMessage {
  type: 'answer';
  answer: RTCSessionDescriptionInit;
}

export interface CandidateMessage {
  type: 'candidate';
  candidate: RTCIceCandidateInit;
}

export type ISignalingMessage = OfferMessage | AnswerMessage | CandidateMessage;
