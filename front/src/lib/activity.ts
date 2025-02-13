import { rootURL } from "@/api/main";

export enum ActivityTypeEnum {
  MESSAGE = "Message",
  FILE = "File"
}

export type ActivityType = {
  id?: string;
  userId: string;
  workspaceId: string;
  channelId?: string;
  type: ActivityTypeEnum;
  desciption: string;
  createdAt?: Date;
}

export const createActivity = async (activity: ActivityType) => {
  const { workspaceId } = activity
  return await fetch(`${rootURL}/workspace/${workspaceId}/activity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({...activity, workspaceId: undefined}),
  }).then(res => res.json());
}

export const getActivities = async (workspaceId: string) => {
    return await fetch(`${rootURL}/workspace/${workspaceId}/activities`).then(res => res.json())
}