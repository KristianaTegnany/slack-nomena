import { rootURL } from "@/api/main";

export type InvitationSender = {
  workspaceId: string, inviterId: string
}

export type InvitationType = {
  id?: string,
  status?: string
} & InvitationSender

export const createInvitation = async (invitation: InvitationSender) => {
  const { workspaceId, inviterId } = invitation
  return await fetch(`${rootURL}/invitation/workspace/${workspaceId}/invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inviterId }),
  }).then(res => res.json());
}

export const acceptInvitation = async (id: string, userId: string) => {
  return await fetch(`${rootURL}/invitation/${id}/accept`,  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  }).then(res => res.json())
}

export const getInvitationById = async (id: string) => {
  return await fetch(`${rootURL}/invitation/${id}`).then(res => res.json())
}