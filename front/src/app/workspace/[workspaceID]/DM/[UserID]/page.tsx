"use client";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Paperclip, User } from "lucide-react";
import { ChatInput } from "@/components/ui/ChatInput";
import { BiSolidMessage } from "react-icons/bi";
import Image from 'next/image'
import { Message, MessageProps } from "@/components/ui/message";
import { DMHeader } from "@/components/ui/DMHeader";
import React, { Usable, useCallback, useEffect, useState } from "react";
import useGetUserById from "@/hooks/useGetUserById";
import useGetDMMessages from "@/hooks/useGetDMMessages";
import { PrivateMessageType, sendPrivateMessage } from "@/lib/message";
import useCheckAuth from "@/hooks/useCheckAuth";
import { messageParser } from "@/lib/parser";

type Params = { workspaceID: string, UserID: string }

const DMPage = ({ params }: { params: Usable<Params> }) => {
  const resolvedParams = React.use(params);
  const [mssState, setMssState] = useState<MessageProps[]>([])
  const user = useCheckAuth()

  const { workspaceID, UserID } = resolvedParams

  const interlocutor = useGetUserById(UserID)

  const messages = useGetDMMessages(UserID)
  useEffect(() => {
    if (messages.length) setMssState(messages)
  }, [messages])

  const onMessageSend = useCallback((message: string) => {
    if(user && user.uid) {
      const dm = {
        senderId: user.uid,
        receiverId: UserID,
        content: message
      } as PrivateMessageType
      sendPrivateMessage(dm).then(res => {
        if(res && res.messageData) {
          messageParser(res.messageData).then(msg => setMssState([...mssState, msg]))
        }
      })
    }
  }, [mssState, user])



  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 3.75rem)' }}>
      <div className=" border-b space-y-4 my-3">
        {interlocutor && <DMHeader name={interlocutor.displayName} id={interlocutor.email} urlProfile={interlocutor.photoURL} />}
      </div>

      <div className=" overflow-y-auto pb-8 px-4">
        <div className="flex-1 flex flex-col pb-4 mt-12">
          <div className="flex flex-col gap-y-2 h-full items-center justify-center">
            {interlocutor && <div className="flex items-center gap-x-4">
              <Image
                src={interlocutor.photoURL || "/user.svg"}
                width={120}
                height={120}
                alt="interlocutor id"
                className="rounded-full"
              />
              <div className="flex flex-col justify-start items-start gap-y-3">
                <Typography text={`${interlocutor.displayName}`} variant="h1" className=" text-slate-800 text-start" />
                <Typography text={`${interlocutor.email}`} variant="p" className=" text-slate-500" />
              </div>
            </div>}
          </div>
        </div>
        {mssState.map((msg, index) => {
          return <Message key={index} {...msg} />
        })}
      </div>


      <div className="mt-auto -mb-6">
        <ChatInput getMessage={onMessageSend} placeholder="type..." />
      </div>

    </div>
  );
};

export default DMPage;