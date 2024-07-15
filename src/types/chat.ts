import { Id as UserId } from './user';

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

export interface IChat {
  messageId?: string;
  senderUsername: string;
  content: Content;
  timestamp: string;
}
