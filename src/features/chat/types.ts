export interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}

export interface IRoom {
  roomId: number;
  roomName: string;
}
