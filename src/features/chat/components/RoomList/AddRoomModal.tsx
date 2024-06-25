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
import { useEffect, useState } from "react";
import useHandleRoom from "../../hooks/useHandleRoom";

const AddRoomModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const username = useAuthStore((state) => state.user);
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    setRoomName(`${username}'s room`);
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRoomName(event.target.value);

  // add room
  const { addRoomMutation } = useHandleRoom();
  const handleSubmit = () => {
    addRoomMutation.mutate(roomName);
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
            ROOM NAME
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

export default AddRoomModal;
