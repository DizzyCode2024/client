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
