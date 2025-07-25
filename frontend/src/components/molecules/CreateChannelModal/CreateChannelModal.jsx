import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useState } from "react";

export const CreateChannelModal = () => {
  const [channelName, setChannelName] = useState("");
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();

  function handleClose() {
    setOpenCreateChannelModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      console.log("Creating channel:", channelName);
    } catch (error) {
      console.log("Error creating channel:", error);
    }
  }

  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel Name"
            minLength={3}
            maxLength={20}
            required
          />
          <div className="flex justify-end mt-4">
            <Button variant="primary" type="submit">
              Create Channel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
