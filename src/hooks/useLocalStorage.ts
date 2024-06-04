/**
 * useLocalStorage
 *
 * A custom React hook that provides a way to persist state to localStorage.
 * This hook works similarly to useState but also stores and retrieves the state from localStorage.
 *
 * @template T - The type of the value to be stored in localStorage.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {T} [initialValue] - The initial value to use if there is no value in localStorage.
 *
 * @returns {[T, (value: T | ((val: T) => T)) => void]} - An array containing the current value and a function to update it.
 *
 * @example
 * // Basic usage:
 * const [name, setName] = useLocalStorage<string>('name', '정땡땡');
 *
 * // Update the value:
 * setName('곽땡땡');
 *
 * // Update the value using a function:
 * setCount(prevCount => prevCount + 1);
 *
 * // Example in a component:
 * const Counter: React.FC = () => {
 *   const [count, setCount] = useLocalStorage<number>('count', 0);
 *
 *   const increment = () => {
 *     setCount(prevCount => prevCount + 1);
 *   };
 *
 *   return (
 *     <div>
 *       <h1>Count: {count}</h1>
 *       <button onClick={increment}>Increment</button>
 *     </div>
 *   );
 * };
 */

import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // get the value from local storage
  const readValue = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // return the value if it exists in local storage. If not, return the initialValue
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // update the value and save it to local storage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // update state
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      // save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
