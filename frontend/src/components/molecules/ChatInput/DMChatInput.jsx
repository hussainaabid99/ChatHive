import { useState } from "react";
import { getSignatureRequest } from "@/apis/cloudinary";
import { useGetCloudinarySignature } from "@/hooks/apis/cloudinary/useGetCloudinarySignature";
import { useUploadToCloudinary } from "@/hooks/apis/cloudinary/useUploadToCloudinary";
import { useAuth } from "@/hooks/context/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useDirectMessages } from "@/hooks/context/useDirectMessages";
import { SendDirectMessage } from "@/hooks/apis/dm/useSendDirtectMessage";
import { Editor } from "@/components/atoms/Editor/Editor";
import { useSocket } from "@/hooks/context/useSocket";

export const DMChatInput = () => {
  const [uploading, setUploading] = useState(false);
  const { userId } = useParams();
  const { socket, otherUser } = useSocket();
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setMessageList } = useDirectMessages();
  const { sendDMMutation } = SendDirectMessage();
  const { mutateAsync: uploadImage } = useUploadToCloudinary();

  async function handleSubmit({ body, image }) {
    try {
      setUploading(true);
      let imageUrl = null;
      if (image) {
        const signatureRes = await queryClient.fetchQuery({
          queryKey: ["cloudinary-signature"],
          queryFn: () => getSignatureRequest({ token: auth?.token }),
        });
        const uploaded = await uploadImage({
          file: image,
          signatureRes,
        });
        imageUrl = uploaded?.secure_url;
      }

      socket.emit(
        "newDM",
        {
          receiverId: userId || otherUser,
          body,
          image: imageUrl,
          senderId: auth?.user?.id,
        },
        (data) => console.log("DM sent successfully", data)
      );
    } catch (err) {
      toast({
        title: "Error sending message",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full p-1">
      <div className="mx-auto">
        <Editor
          onSubmit={handleSubmit}
          uploading={uploading}
          setUploading={setUploading}
        />
      </div>
    </div>
  );
};
