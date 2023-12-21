import { useEffect, useState } from "react";

export const useClickAway = (ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref?.current?.parentElement?.contains(event.target)) {
        setIsOpen(!isOpen);
      }

      if (!ref?.current?.parentElement?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen]);

  return isOpen;
};
