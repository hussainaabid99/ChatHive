import { useAuth } from "@/hooks/context/useAuth";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useDirectMessages } from "@/hooks/context/useDirectMessages";
// removed: useQueryClient (unused)
import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { auth } = useAuth();
  const { setMessageList } = useChannelMessages();
  const { setDmList } = useDirectMessages();

  const [currentChannel, setCurrentChannel] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  // Create a single socket instance
  const socketRef = useRef(null);
  if (!socketRef.current) {
    socketRef.current = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
      autoConnect: true,
    });
  }
  const socket = socketRef.current;

  useEffect(() => {
    const handleNewMessage = (data) => {
      // only append if the message belongs to the active channel
      if (!data?.channelId || data.channelId !== currentChannel) return;
      setMessageList((prev) => [...prev, data]);
    };

    const handleNewDM = (data) => {
      setDmList((prev) => [...prev, data]);
    };

    socket.on("newMessageReceived", handleNewMessage);
    socket.on("newDMReceived", handleNewDM);

    return () => {
      socket.off("newMessageReceived", handleNewMessage);
      socket.off("newDMReceived", handleNewDM);
    };
  }, [socket, currentChannel, setMessageList, setDmList]);

  async function joinChannel(channelId) {
    if (currentChannel && currentChannel !== channelId) {
      socket?.emit("leaveChannel", { channelId: currentChannel });
    }
    socket?.emit("joinChannel", { channelId }, (data) => {
      console.log("Successfully joined channel", data);
      setCurrentChannel(channelId);
    });
  }

  async function joinDM(otherUserId) {
    socket?.emit(
      "joinDM",
      {
        senderId: auth?.user?.id,
        receiverId: otherUserId,
      },
      (data) => {
        console.log("Successfully joined DM", data);
        setOtherUser(otherUserId);
      }
    );
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        currentChannel,
        joinChannel,
        joinDM,
        setMessageList,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
