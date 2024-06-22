import { Tooltip } from "@chakra-ui/react";

const CustomTooltip = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <Tooltip label={label} fontSize="2xl" bg="gray.900">
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
