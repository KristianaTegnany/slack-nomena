import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useChannelId } from "@/hooks/useChannelId";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";


type Id = string; // Static type definition for Id

const Editor = dynamic(() => import("@/components/ui/Editor"), { ssr: false });

// Mock implementation of useCreateMessage
const useCreateMessage = () => {
  return {
    mutateAsync: async (values: CreateMessageValues) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Message created: ${JSON.stringify(values)}`);
          resolve(`Message created: ${JSON.stringify(values)}`);
        }, 1000);
      });
    },
    isPending: false,
  };
};

// Mock implementation of useGenerateUploadUrl
const useGenerateUploadUrl = () => {
  return {
    mutateAsync: async (file: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const url = URL.createObjectURL(file);
          console.log(`Upload URL generated: ${url}`);
          resolve(url);
        }, 1000);
      });
    },
    isPending: false,
  };
};


interface ChatInputProps {
  placeholder: string;
  getMessage: (msg: string) => void
}

type CreateMessageValues = {
  channelId: Id;
  workspaceId: Id;
  body: string;
  image?: Id;
};

export const ChatInput = ({ placeholder, getMessage }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const createMessage = useCreateMessage();
  const generateUploadUrl = useGenerateUploadUrl();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      editorRef.current?.enable(false);

      const values: CreateMessageValues = {
        body,
        workspaceId,
        channelId,
        image: undefined,
      };

      const {ops:[{insert: message}]} = JSON.parse(body)

      getMessage(message)


      if (image) {
        const url = await generateUploadUrl.mutateAsync(image) as string;

        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if (!result.ok) {
          throw new Error("Failed to upload image");
        }

        const { storageId } = await result.json();

        values.image = storageId;
      }
      await createMessage.mutateAsync(values);
      setEditorKey((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
      editorRef.current?.enable(true);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};
