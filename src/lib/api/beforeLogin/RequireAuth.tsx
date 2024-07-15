import { useToast } from '@chakra-ui/react';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/stores/useAuthStore';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      toast({
        title: '로그인을 해주세요',
        description: '접근 권한이 필요합니다.',
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      navigate('/login');
    }
  }, [token, navigate, toast]);

  return token ? children : null;
};

export default RequireAuth;
