"use client";
import { Button } from "@/components/ui/button";
import Typography  from "@/components/ui/typography";
import { Paperclip } from "lucide-react";
import { ChatInput } from "@/components/ui/ChatInput";
import { BiSolidMessage } from "react-icons/bi";
import Image from 'next/image'
import { MessageProps, Message } from "@/components/ui/message";
import { ChannelHeader } from "@/components/ui/channelHeader";
import React, { Usable } from "react";
import useGetChannelById from "@/hooks/useGetChannelById";


const mockChannelData = {
  channelName: 'General Chat',
  channelId: 'general-123',
  createdAt: 'September 2nd, 2024',
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

type Params = { workspaceID: string, channelID: string }

const ChannelPage = ({params} : {params: Usable<Params>}) => {

  const resolvedParams = React.use(params)
  const { workspaceID, channelID } = resolvedParams

  const channel = useGetChannelById(workspaceID, channelID)

  return (
    <div className="flex flex-col"  style={{ height: 'calc(100vh - 3.75rem)' }}>
      <div className=" border-b space-y-4">
      {channel && <ChannelHeader name={channel.name} id={channel.id!} />}
      </div>

      <div className=" overflow-y-auto pb-8">
      <div className="flex-1 flex flex-col pb-4 mt-12">
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <div className="flex items-center gap-x-4">
          <Image
            src="/3dicons-chat-bubble-front-color.png"
            width={120}
            height={120}
            alt="Slack logo"
          />
          <div className="flex flex-col justify-start items-start gap-y-3">
            <Typography text={`Have a little chit-chat in ${mockChannelData.channelName}`} variant="h1" className=" text-slate-800 text-start" />
            <Typography text={`You created this channel on ${mockChannelData.createdAt}. This is the very beginning of the ${mockChannelData.channelName} channel.`} variant="p" className=" text-slate-500" />
          </div>
          </div>
        </div>
        
      </div>

      {mockMessages.length > 0 && (
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 rounded-full border border-gray-300 px-3 py-1">Today</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      )}

      {mockMessages.map((msg, index) => (
        <Message key={index} {...msg} />
      ))}
      
      </div>


        <div className="mt-auto -mb-6">
          <ChatInput placeholder="type..." />
        </div>
        {/* Input */}

    </div>
  );
};

export default ChannelPage;