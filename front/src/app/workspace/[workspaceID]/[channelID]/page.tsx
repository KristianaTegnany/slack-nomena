"use client";
import Typography from "@/components/ui/typography";
import { ChatInput } from "@/components/ui/ChatInput";
import Image from 'next/image'
import { MessageProps, Message } from "@/components/ui/message";
import { ChannelHeader } from "@/components/ui/channelHeader";
import React, { Usable, useCallback, useEffect, useState } from "react";
import useGetChannelById from "@/hooks/useGetChannelById";
import { messageParser, parseDateToDDMMYYYY } from "@/lib/parser";
import useGetMessagesChannel from "@/hooks/useGetMessagesChannel";
import useCheckAuth from "@/hooks/useCheckAuth";
import { ChannelMessageType, sendChannelMessage } from "@/lib/message";

type Params = { workspaceID: string, channelID: string }

const ChannelPage = ({ params }: { params: Usable<Params> }) => {

  const resolvedParams = React.use(params)
  const { workspaceID, channelID } = resolvedParams
  const channel = useGetChannelById(workspaceID, channelID)
  const [mssState, setMssState] = useState<MessageProps[]>([])
  const user = useCheckAuth()
  const messages = useGetMessagesChannel(channelID)
  useEffect(() => {
    if (messages.length) setMssState(messages)
  }, [messages])

  const onMessageSend = useCallback((message: string) => {
    if (user && user.uid) {
      const channelMsg = {
        senderId: user.uid,
        channelId: channelID,
        content: message
      } as ChannelMessageType
      sendChannelMessage(channelMsg).then(res => {
        if (res && res.messageData) {
          messageParser(res.messageData).then(msg => setMssState([...mssState, msg]))
        }
      })
    }
  }, [mssState, user])

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 3.75rem)' }}>
      <div className=" border-b space-y-4">
        {channel && <ChannelHeader name={channel.name} id={channel.id!} />}
      </div>
      <div className=" overflow-y-auto pb-8">
        {channel && <div className="flex-1 flex flex-col pb-4 mt-12">
          <div className="flex flex-col gap-y-2 h-full items-center justify-center">
            <div className="flex items-center gap-x-4">
              <Image
                src="/3dicons-chat-bubble-front-color.png"
                width={120}
                height={120}
                alt="Slack logo"
              />
              <div className="flex flex-col justify-start items-start gap-y-3">
                <Typography text={`Have a little chit-chat in ${channel.name}`} variant="h1" className=" text-slate-800 text-start" />
                <Typography text={`You created this channel on ${parseDateToDDMMYYYY(channel.createdAt)}. This is the very beginning of the ${channel.name} channel.`} variant="p" className=" text-slate-500" />
              </div>
            </div>
          </div>

        </div>}
        {mssState.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
      </div>
      <div className="mt-auto -mb-6">
        <ChatInput getMessage={onMessageSend} placeholder="type..." />
      </div>
    </div>
  );
};

export default ChannelPage;