import { MessageProps } from "@/components/ui/message"
import { getChannelMessage } from "@/lib/message"
import { messageParser } from "@/lib/parser"
import { useEffect, useState } from "react"
export type MessageChannelFromBE = {
  id: string,
  channelId: string,
  senderId: string,
  content: string,
  sentAt: Date,
}

const useGetMessagesChannel = (channelId: string) => {
  const [messages, setMessages] = useState<MessageProps[]>([])
  useEffect(() => {
    getChannelMessage(channelId).then(res => {
      if (res) {
        const messages = res.map(async (m: MessageChannelFromBE) => {
          return messageParser(m)
        })
        Promise.all(messages).then(setMessages)
      }
    })
  }, [channelId])

  return messages.sort((msg1, msg2) => new Date(msg1.time) - new Date(msg2.time))
}

export default useGetMessagesChannel