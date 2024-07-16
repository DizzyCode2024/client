import { useState, useCallback, Dispatch, SetStateAction } from 'react';

type Handler = (e: React.ChangeEvent<HTMLInputElement>) => void;
type ReturnTypes<T> = [T, Handler, Dispatch<SetStateAction<T>>];

const useInput = <T extends string | number | readonly string[] | undefined>(
  initialValue: T,
): ReturnTypes<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const handler: Handler = useCallback((e) => {
    setValue(e.target.value as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
