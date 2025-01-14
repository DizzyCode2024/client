import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface MessageContextProps {
  optimisticMessage: string;
  setOptimisticMessage: (message: string) => void;
}

const MessageContext = createContext<MessageContextProps>({
  optimisticMessage: '',
  setOptimisticMessage: () => {},
});

export const MessageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [optimisticMessage, setOptimisticMessage] = useState<string>('');

  const value = useMemo(
    () => ({
      optimisticMessage,
      setOptimisticMessage,
    }),
    [optimisticMessage, setOptimisticMessage],
  );

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const useMessage = () => {
  return useContext(MessageContext);
};
