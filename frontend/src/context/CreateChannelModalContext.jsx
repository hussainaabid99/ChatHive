import { createContext, useState } from "react";

export const CreateChannelModalContext = createContext();

export default function CreateChannelModalContextProvider({ children }) {
  const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);
  return (
    <CreateChannelModalContext.Provider
      value={{ openCreateChannelModal, setOpenCreateChannelModal }}
    >
      {children}
    </CreateChannelModalContext.Provider>
  );
}
