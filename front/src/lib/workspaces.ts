import { rootURL } from "@/api/main";

export type WorkSpaceType = {
  id?: string,
  name: string,
  userid: string,
  members?: string[]
}

export const createOrUpdateWorkspace = async (ws: WorkSpaceType, isUpdate?: boolean) => {
  return await fetch(`${rootURL}/workspaces`, {
    method: isUpdate ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ws),
  }).then(res => res.json());
}

export const getWorkspaces = async (userid: string) => {
  return await fetch(`${rootURL}/workspaces/by-userid/${userid}`).then(res => res.json());
}

export const getWorkspaceById = async (workspaceId: string) => {
  return await fetch(`${rootURL}/workspaces/by-id/${workspaceId}`).then(res => res.json());
}

export const deleteWorkspace = async (wsId: string) => {
  return await fetch(`${rootURL}/workspaces/${wsId}`, {
    method: "DELETE",
  }).then(res => res.json()); 
}