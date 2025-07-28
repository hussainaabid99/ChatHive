import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);
  const [currentChannel, setCurrentChannel] = useState(null);

  async function joinChannel(channelId) {
    socket?.emit("joinChannel", { channelId }, (data) => {
      console.log("Successfully joined channel", data);
      setCurrentChannel(channelId);
    });
  }

  return (
    <SocketContext.Provider value={{ socket, currentChannel, joinChannel }}>
      {children}
    </SocketContext.Provider>
  );
}
