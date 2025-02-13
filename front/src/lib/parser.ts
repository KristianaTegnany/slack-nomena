import { MessageDMFromBE } from "@/hooks/useGetDMMessages";
import { getUserByUid } from "./auth";
import { MessageProps } from "@/components/ui/message";
import { MessageChannelFromBE } from "@/hooks/useGetMessagesChannel";

export const messageParser = async (msgBE: MessageDMFromBE | MessageChannelFromBE) => {
  const u = await getUserByUid(msgBE.senderId)
  return {
    avatar: u.photoURL,
    name: u.displayName,
    text: msgBE.content,
    time: msgBE.sentAt
  } as unknown as MessageProps
}

export const parseDateToDDMMYYYY = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0")
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const year = date.getUTCFullYear()

  return `${day} / ${month} / ${year}`
}
