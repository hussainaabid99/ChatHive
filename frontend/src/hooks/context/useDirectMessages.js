import DirectMessages from "@/context/DirectMessages";
import { useContext } from "react";

export const useDirectMessages = () => {
  return useContext(DirectMessages);
};
