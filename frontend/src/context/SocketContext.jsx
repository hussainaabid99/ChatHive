import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
