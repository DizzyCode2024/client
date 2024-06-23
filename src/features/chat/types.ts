export interface IServer {
  id: number;
  name: string;
}

export interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}

export interface RoomResponse {
  roomId: number;
  roomName: string;
}
