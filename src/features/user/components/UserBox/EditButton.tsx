import { EditIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import CustomTooltip from '@/components/Tooltip';

const EditProfile = () => (
  <CustomTooltip label={'프로필 편집'}>
    <Box
      backgroundColor={'rgba(0,0,0,0.5)'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'absolute'}
      top={3}
      right={3}
      p={2}
      borderRadius={'50%'}
      _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
    >
      <EditIcon boxSize={7} />
    </Box>
  </CustomTooltip>
);

export default EditProfile;
