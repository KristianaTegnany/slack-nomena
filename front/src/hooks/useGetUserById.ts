import { useEffect, useState } from "react"
import { UserFromFirebaseType } from "./useGetUserDM"
import useCheckAuth from "./useCheckAuth"
import { getUserByUid } from "@/lib/auth"

const useGetUserById = (userid: string) => {
  const [user, setUser] = useState<UserFromFirebaseType>()
  const userauth = useCheckAuth()

  useEffect(() => {
    if (userauth && userauth.uid) {
      getUserByUid(userid).then(res => {
        setUser({...res, displayName: res.displayName === undefined || !(res.displayName && res.displayName.length) ? res.email.split('@')[0] : res.displayName})
      })
    }
  }, [userauth])
  return user
}

export default useGetUserById