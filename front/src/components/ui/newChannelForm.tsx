import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import Typography from "@/components/ui/typography"; // Assuming you have a Typography component

interface NewChannelFormProps {
  onClose: () => void;
  onSubmit: (channelName: string) => void;
}

export const NewChannelForm = ({ onClose, onSubmit }: NewChannelFormProps) => {
  const [channelName, setChannelName] = useState("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   onSubmit(channelName);
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg min-w-[400px]">
        <Typography
          text='Create new channel'
          variant='h6'
          className='mb-3'
        />
        <form>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter channel name"
          />
          <div className="mt-4 flex justify-end gap-2 w-full">
            <Button type="button" variant="secondary" onClick={onClose} className="w-full hover:bg-slate-200">
              Cancel
            </Button>
            <Button onClick={() => onSubmit(channelName)} variant="secondary" className="w-full bg-primary-dark text-slate-50 hover:bg-primary-light ">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};