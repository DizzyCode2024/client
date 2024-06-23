import axiosInstance from "../../../api/axiosInstance";
import { RoomResponse } from "../types";

export const createRoom = async (roomName: string): Promise<RoomResponse> => {
  const response = await axiosInstance.post("/api/room", { roomName });
  return response.data;
};
