import { createRoom } from "@/features/chat/api/chatApi";
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
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RoomResponse } from "../../types";
import { useCustomToast } from "@/hooks/useCustomToast";

const AddServerModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const name = "김땡땡";
  const [roomName, setRoomName] = useState<string>("");

  const toast = useCustomToast();

  useEffect(() => {
    setRoomName(`${name}'s server`);
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRoomName(event.target.value);

  const mutation = useMutation<RoomResponse, Error, string>({
    mutationFn: createRoom,
  });

  const handleSubmit = () => {
    mutation.mutate(roomName, {
      onSuccess: (data) => {
        console.log("Room created successfully:", data);
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
