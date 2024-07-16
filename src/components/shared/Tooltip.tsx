import { Tooltip } from '@chakra-ui/react';

const CustomTooltip = ({
  label,
  children,
  ...props
}: {
  label: string;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <Tooltip label={label} fontSize={'sm'} bg={'gray.900'} {...props}>
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
