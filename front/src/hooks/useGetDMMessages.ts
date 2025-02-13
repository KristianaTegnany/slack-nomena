import { MessageProps } from "@/components/ui/message"
import { getPrivateMessages } from "@/lib/message"
import { useEffect, useState } from "react"
import useCheckAuth from "./useCheckAuth"
import { messageParser } from "@/lib/parser"

export type MessageDMFromBE = {
  id: string,
  senderId: string,
  receiverId: string,
  content: string,
  sentAt: Date
}

const useGetDMMessages = (withUserId: string) => {
  const [messages, setMessages] = useState<MessageProps[]>([])
  const user = useCheckAuth()
  useEffect(() => {
    if(user && user.uid) {
      getPrivateMessages(user.uid, withUserId).then(res => {
        if(res) {
          const messages = res.map(async (m: MessageDMFromBE) => {
            return messageParser(m)
          })

          Promise.all(messages).then(setMessages)
        }
      })
    }
  }, [user])

  return messages.sort((msg1, msg2) => new Date(msg1.time) - new Date(msg2.time)) //TODO: marqeur comme erreur mais ça marche
}

export default useGetDMMessages