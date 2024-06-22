import CustomTooltip from "@/components/Tooltip";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Indicator from "./Indicator";
import useServerStore from "@/stores/useServerStore";

const DMButton = () => {
  const isSelected = useServerStore((state) => state.currentServerId === 0); // DM server의 id는 0
  const navigate = useNavigate();
  const setCurrentServer = useServerStore((state) => state.setCurrentServer);

  const handleClick = () => {
    navigate("/chat/main");
    setCurrentServer(0);
  };
  return (
    <Box
      w="100%"
      display={"flex"}
      justifyContent={"center"}
      position={"relative"}
    >
      {isSelected && <Indicator />}
      <CustomTooltip label={"다이렉트 메세지"} placement="right">
        <Button
          onClick={handleClick}
          m={"0.5rem auto"}
          h="5rem"
          w="5rem"
          borderRadius="50%"
          transition="all 0.3s ease-in-out"
          bg={"gray.700"}
          color="white"
          fontSize="1rem"
          _hover={{
            bg: "purple.600",
            borderRadius: "30%",
            color: "white",
          }}
        >
          <Text fontSize="2xl">DM</Text>
        </Button>
      </CustomTooltip>
    </Box>
  );
};

export default DMButton;
