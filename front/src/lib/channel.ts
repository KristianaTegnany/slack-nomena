import { rootURL } from "@/app/api/main"

export type ChannelType = {
  id?: string,
  workspaceId: string,
  name: string,
  createdBy: string,
  createdAt?: Date,
}

export const getChannels = async (workspaceId: string) => {
  return await fetch(`${rootURL}/workspace/${workspaceId}/channels`).then(res => res.json())
}

export const createChannel = async (channel: ChannelType) => {
  const { workspaceId, name, createdBy } = channel
  return await fetch(`${rootURL}/workspace/${workspaceId}/channels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, createdBy }),
  }).then(res => res.json());
}

export const getChannelById = async (workspaceId: string, channelId: string) => {
  return await fetch(`${rootURL}/workspace/${workspaceId}/channels/${channelId}`).then(res => res.json())
}