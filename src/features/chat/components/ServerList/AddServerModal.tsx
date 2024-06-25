import { createRoom } from "@/features/chat/api/chatApi";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IRoom } from "../../types";

const AddServerModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const username = useAuthStore((state) => state.user);
  const [roomName, setRoomName] = useState<string>("");

  const toast = useCustomToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    setRoomName(`${username}'s server`);
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRoomName(event.target.value);

  const mutation = useMutation<IRoom, Error, string>({
    mutationFn: createRoom,
    onSuccess: (data) => {
      console.log("Room created:", data);
      toast({
        title: "방 생성 성공",
        description: "새로운 방이 생성되었습니다.",
        status: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      console.error("Error creating room:", error);
      toast({
        title: "방 생성 실패",
        description: "다시 시도해주세요.",
        status: "error",
      });
    },
  });

  const handleSubmit = () => {
    mutation.mutate(roomName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent p="0.5rem">
        <ModalHeader></ModalHeader>
        <ModalCloseButton size="xl" />
        <ModalBody pt="2rem">
          <Text fontWeight="bold" fontSize={"xl"} color="gray.300">
            SERVER NAME
          </Text>
          <Input
            value={roomName}
            onChange={handleChange}
            fontSize={"2xl"}
            bg="gray.900"
            border="none"
            py="10"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
            bg="transparent"
            color="white"
            fontSize="xl"
            _hover={{
              bg: "transparent",
              color: "white",
            }}
          >
            취소
          </Button>
          <Button fontSize="xl" onClick={handleSubmit}>
            채널 만들기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddServerModal;
