"use client";
import { Button } from "@/components/ui/button";
import Typography  from "@/components/ui/typography";
import { Paperclip, User } from "lucide-react";
import { ChatInput } from "@/components/ui/ChatInput";
import { BiSolidMessage } from "react-icons/bi";
import Image from 'next/image'
import { MessageProps } from "@/components/ui/message";
import { DMHeader } from "@/components/ui/DMHeader";


const mockDMData = {
  username: 'Alpha Jedidia',
  userID: 'general-123',
  urlProfile: '//Me.png',
  userEmail : 'alphajedidia01@gmail.com'
};


// Mock data examples
const mockMessages: MessageProps[] = [
  {
    avatar: '/Me.png',
    name: 'Alpha Jedidia',
    time: '12:34 PM',
    text: 'Howdy',
    image: '/3dicons-chat-bubble-front-color.png',
  },
  {
    avatar: '/slack.svg',
    name: 'Beta Smith',
    time: '3:45 PM',
    text: 'Hello there!',
    image: '',
  },
];

const DMPage = () => {

  return (
    <div className="flex flex-col"  style={{ height: 'calc(100vh - 3.75rem)' }}>
      {/* Header */}
      <div className=" border-b space-y-4 my-3">
        <DMHeader name={mockDMData.username} id={mockDMData.userID} urlProfile={mockDMData.urlProfile} />
        {/* Tabs */}
        <div className="flex justify-start">
          <Button variant="ghost" size="sm" className="gap-x-2 px-4 py-2 border-b-2 rounded-none border-[#5E2C5F] text-[#5E2C5F]">
            <BiSolidMessage size={15} />
            <Typography text="Chat" variant="p" className=" font-bold " />
          </Button>
          <Button variant="ghost" size="sm" className=" gap-x-2 px-4 py-2 text-slate-400">
            <Paperclip size={15} />
            <Typography text="Files" variant="p" />
          </Button>
        </div>
        {/* Tabs */}
      </div>
      
      {/* Header */}

      <div className=" overflow-y-auto pb-8">
              {/* intro */}
      <div className="flex-1 flex flex-col pb-4 mt-12">
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <div className="flex items-center gap-x-4">
          <Image
            src={mockDMData.urlProfile}
            width={120}
            height={120}
            alt="Slack logo"
            className="rounded-full"
          />
          <div className="flex flex-col justify-start items-start gap-y-3">
            <Typography text={`${mockDMData.username}`} variant="h1" className=" text-slate-800 text-start" />
            <Typography text={`${mockDMData.userEmail}`} variant="p" className=" text-slate-500" />
          </div>
          </div>
            <div className="flex items-center gap-x-8 justify-center mt-4">
              <Button variant="secondary" size="default" className="gap-x-2 px-4 py-2 w-[400px]">
                <User size={15} />
                <Typography text="View Profile" variant="p" />
              </Button>
            </div>
        </div>
        
      </div>

      {/* intro */}
      
      </div>


        <div className="mt-auto -mb-6">
          <ChatInput placeholder="type..." />
        </div>
        {/* Input */}

    </div>
  );
};

export default DMPage;