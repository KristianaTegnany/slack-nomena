import { getUserByUid } from "@/lib/auth"
import { getWorkspaceById, WorkSpaceType } from "@/lib/workspaces"
import { useEffect, useState } from "react"
import { UserFromFirebaseType } from "./useGetUserDM"

const useGetUserFromWS = (wsId: string) => {
  const [users, setUsers] = useState<UserFromFirebaseType[]>([])
  useEffect(() => {
    getWorkspaceById(wsId).then((res: WorkSpaceType) => {
      if (res && res.members) {
        const members = [...res.members, res.userid].map(async (m) => await getUserByUid(m))
        Promise.all(members).then(res => setUsers(res.map(u => {
          if (u.displayName === undefined || !(u.displayName && u.displayName.length)) return { ...u, displayName: u.email.split('@')[0] }
          return u
        })))
      }
    })
  }, [wsId])
  return users
}

export default useGetUserFromWS