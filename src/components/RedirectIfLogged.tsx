import React, { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

interface RedirectIfLogged {
  children: ReactNode;
}

const RedirectIfLogged: React.FC<RedirectIfLogged> = ({ children }) => {
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
