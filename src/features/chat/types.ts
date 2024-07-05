import { UserId } from '../auth/types';

export type Content = string;

export interface ISendChatPayload {
  senderId: UserId;
  content: Content;
}

export interface IReceiveChatPayload {
  messageId?: string;
  senderUsername: string;
  content: Content;
  timestamp: string;
}

// video call
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
