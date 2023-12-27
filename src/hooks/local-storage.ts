import { useState, useEffect } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: string | (() => void)
) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);

      if (!item) {
        return initialValue;
      }

      if (typeof initialValue === "function") {
        return initialValue();
      }

      return JSON.parse(item);
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
