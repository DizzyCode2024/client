import axiosInstance from "../../../api/axiosInstance";
import { IRoom } from "../types";

export const createRoom = async (roomName: string): Promise<IRoom> => {
  const response = await axiosInstance.post("/rooms", { roomName });
  return response.data;
};

export const getRooms = async (): Promise<IRoom[]> => {
  const response = await axiosInstance.get("/rooms");
  return response.data;
};
