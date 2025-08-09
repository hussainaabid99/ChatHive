import { createContext, useState } from "react";

const DirectMessages = createContext();

export const DirectMessagesProvider = ({ children }) => {
  const [dmList, setDmList] = useState([]);

  return (
    <DirectMessages.Provider value={{ dmList, setDmList }}>
      {children}
    </DirectMessages.Provider>
  );
};

export default DirectMessages;
