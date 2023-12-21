import { createContext } from "react";
import { useSessionStorage } from "../hooks";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useSessionStorage("currentUser", null);

  const handleRemoveCurrentUser = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, handleRemoveCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
