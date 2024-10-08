import { UserId } from './user';

export type Content = string;

export interface IFile {
  file: File;
  name: string;
  type: string;
  size: number;
  preview: string;
}

export interface IFileState {
  files: IFile[];
  uploadedUrls: string[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileToRemove: IFile) => void;
  clearFiles: () => void;
  addUploadedUrl: (url: string) => void;
  clearUploadedUrls: () => void;
}

export interface ISendChatPayload {
  senderId: UserId;
  content: Content;
  url?: IFile[] | string[];
}

export interface IChat {
  messageId?: string;
  senderUsername: string;
  content: Content;
  timestamp: string;
  url?: string;
}
