import { axiosInstance, postStatus, signupAxiosInstance } from '@/lib/api';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { IMember } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useStompClient from './useStompClient';

interface IUseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  signout: (offlinePayload: IMember) => void;
}

export const useAuthActions = (): IUseAuth => {
  const toast = useToast();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const { deactivateSocket } = useStompClient();

  const signup = async (email: string, password: string, username: string) => {
    try {
      const response = await signupAxiosInstance.post(`/signup`, {
        email,
        password,
        username,
      });

      if (response) {
        toast({
          title: '회원가입 성공',
          description: '회원가입이 성공적으로 완료되었습니다.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: '회원가입 실패',
        description: '닉네임과 이메일 형식을 확인해주세요.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const signin = async (email: string, password: string) => {
    localStorage.removeItem('accessToken');

    try {
      const response = await signupAxiosInstance.post(`/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const accessToken = response.headers.authorization.split(' ')[1];
        console.log(response);
        localStorage.setItem('accessToken', accessToken);
        setUser(response.data, accessToken);
        navigate('/chat/main');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: '로그인 실패',
        description: '닉네임과 비밀번호를 확인해주세요.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const signout = async (offlinePayload: IMember) => {
    try {
      localStorage.removeItem('accessToken');
      document.cookie =
        'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
      useAuthStore.getState().clearUser();
      const response = await axiosInstance.post(`/logout`, {});
      await postStatus(offlinePayload);
      deactivateSocket();

      if (response) {
        localStorage.removeItem('accessToken');
        clearUser();
        navigate('/login');
        toast({
          title: '로그아웃 성공',
          description: '로그아웃이 성공적으로 완료되었습니다.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: '로그아웃 실패',
        description: '로그아웃 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return { signin, signup, signout };
};
