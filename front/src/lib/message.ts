import { rootURL } from "@/api/main";

export type ChannelMessageType = {
  channelId: string,
  senderId: string,
  content: string,
}

export type PrivateMessageType = {
  senderId: string,
  receiverId: string,
  content: string,
}

export const sendChannelMessage = async (message: ChannelMessageType) => {
  const { channelId, senderId, content } = message
  return await fetch(`${rootURL}/channel/${channelId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderId, content }),
  }).then(res => res.json());
}

export const getChannelMessage = async (channelId: string) => {
  return await fetch(`${rootURL}/channel/${channelId}/messages`).then(res => res.json())
}

export const sendPrivateMessage = async (message: PrivateMessageType) => {
  const { senderId, content, receiverId } = message
  return await fetch(`${rootURL}/message/${receiverId}/private`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderId, content }),
  }).then(res => res.json());
}

export const getPrivateMessages = async (userId: string, withUserId: string) => {
  return await fetch(`${rootURL}/messages/${userId}/private`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ withUserId }),
  }).then(res => res.json());
}

export const getPrivateConversationUsers = async (userId: string) => {
  console.log("test c", `${rootURL}/messages/users/${userId}/private`)
  return await fetch(`${rootURL}/messages/users/${userId}/private`).then(res => res.json())
}