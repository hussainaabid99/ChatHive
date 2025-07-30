import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { messageList, setMessageList } = useChannelMessages();
  const [currentChannel, setCurrentChannel] = useState(null);

  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

  socket.on("newMessageReceived", (data) => {
    console.log("New message received", data);
    setMessageList([...messageList, data]);
  });

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
};
export default SocketContext;
