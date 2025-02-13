import { getInvitationById } from "@/lib/invitation"
import { useEffect, useState } from "react"

export type Invitation = {
  id: string,
  inviterId: string,
  status: string,
  workspaceId: string
}

const useGetInvitation = (id: string) => {
  const [invitation, setInvitation] = useState<Invitation>()
  useEffect(() => {
    getInvitationById(id).then(res => {
      if(res) {
        setInvitation(res)
      }
    })
  })
  return invitation
}

export default useGetInvitation