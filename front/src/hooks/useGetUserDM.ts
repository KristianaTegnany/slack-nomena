import { getPrivateConversationUsers } from "@/lib/message"
import { useEffect, useState } from "react"
import useCheckAuth from "./useCheckAuth"
import { getUserByUid } from "@/lib/auth"

export type UserFromFirebaseType = {
  displayName: string
  email: string
  emailVerified: 
  true
  photoURL: string
  uid: string
}

const useGetUserDM = () => {
  const [users, setUsers] = useState<UserFromFirebaseType[]>([])
  const user = useCheckAuth()

  useEffect(() => {
    if (user && user.uid) {
      getPrivateConversationUsers(user.uid).then(res => {
        console.log("test b", res)
        if (res && res.users) {
          const { users } = res
          console.log({users})
          const userComplite = users.map(async (userid: string) => await getUserByUid(userid))
          console.log({res, userComplite})
          Promise.all(userComplite).then(res => setUsers(res))
        }
      })
    }
  }, [user])

  return users
}

export default useGetUserDM