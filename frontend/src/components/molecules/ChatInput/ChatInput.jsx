import {
  getSignatureRequest,
  uploadImageToCloudinaryRequest,
} from "@/apis/cloudinary";
import { useState } from "react";
import { Editor } from "@/components/atoms/Editor/Editor";
import { useGetCloudinarySignature } from "@/hooks/apis/cloudinary/useGetCloudinarySignature";
import { useUploadToCloudinary } from "@/hooks/apis/cloudinary/useUploadToCloudinary";
import { useAuth } from "@/hooks/context/useAuth";
import useCurrentWorkspace from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const ChatInput = () => {
  const [uploading, setUploading] = useState(false);
  const { socket, currentChannel } = useSocket();
  const { currentWorkspace } = useCurrentWorkspace();
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const { signatureRes, error: signatureError } = useGetCloudinarySignature();
  const { mutateAsync: uploadImage, data: uploadedData } =
    useUploadToCloudinary();
  const { toast } = useToast();

  async function handleSubmit({ body, image }) {
    try {
      setUploading(true);
      let imageUrl = null;
      if (image) {
        const signatureRes = await queryClient.fetchQuery({
          queryKey: ["cloudinary-signature"],
          queryFn: () => getSignatureRequest({ token: auth?.token }),
        });

        console.log("signatureRes", signatureRes);

        const uploaded = await uploadImage({
          file: image,
          signatureRes,
        });
        imageUrl = uploaded?.secure_url;
      }

      socket?.emit(
        "newMessage",
        {
          channelId: currentChannel,
          body,
          image: imageUrl,
          senderId: auth?.user?.id,
          workspaceId: currentWorkspace._id,
        },
        (data) => console.log("Message sent successfully", data)
      );
    } catch (err) {
      toast({
        title: "Error uploading image",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full p-1">
      <div className=" mx-auto">
        <Editor
          onSubmit={handleSubmit}
          uploading={uploading}
          setUploading={setUploading}
        />
      </div>
    </div>
  );
};
