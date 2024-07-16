import { useAuthStore } from '@/lib/stores/useAuthStore';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectIfLogged = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      navigate('/chat/main');
    }
  }, [token, navigate]);

  return !token ? children : null;
};

export default RedirectIfLogged;
