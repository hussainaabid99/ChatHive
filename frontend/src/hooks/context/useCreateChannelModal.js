import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";
import { useContext } from "react";

export function useCreateChannelModal() {
  return useContext(CreateChannelModalContext);
}
