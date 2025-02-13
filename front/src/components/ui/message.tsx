import Image from 'next/image';
import { Pencil, EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import  Typography  from '@/components/ui/typography';

export type MessageProps =  {
  avatar: string,
  name: string,
  time: string,
  text: string,
  image?: string,
}

export const Message: React.FC<MessageProps> = ({ avatar, name, time, text, image }) => {
  return (
    <div className="flex items-start w-full gap-2 mt-8">
      <Image src={avatar} width={48} height={48} alt="User avatar" className="rounded-full" />
      <div className="w-full">
        <div className="inline-flex gap-4 items-baseline">
          <Typography text={name} variant="p" className="font-semibold text-slate-700" />
          <p className="text-slate-400 text-[11px]">{time}</p>
        </div>
        <Typography text={text} variant="p" className="text-slate-500" />
        {image && (
          <Image src={image} width={250} height={250} alt="Attached image" />
        )}
      </div>
    </div>
  );
};