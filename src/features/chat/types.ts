import { UserId } from '../auth/types';

export interface ISendChatPayload {
  senderId: UserId;
  content: string;
}

export interface IReceiveChatPayload {
  senderUsername: string;
  content: string;
  timestamp: string;
}
