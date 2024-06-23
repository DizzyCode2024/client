import CustomTooltip from "@/components/Tooltip";
import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import AddServerModal from "./AddServerModal";

const AddServerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CustomTooltip label={"서버 추가하기"} placement="right">
        <Button
          onClick={onOpen}
          m={"0.5rem auto"}
          h="5rem"
          w="5rem"
          borderRadius="50%"
          transition="all 0.3s ease-in-out"
          bg={"gray.700"}
          color="green"
          fontSize="1rem"
          _hover={{
            bg: "green",
            borderRadius: "30%",
            color: "white",
          }}
        >
          <AddIcon boxSize={6} />
        </Button>
      </CustomTooltip>
      <AddServerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddServerButton;
