import { useMemo } from "react"
import useCheckAuth from "./useCheckAuth"

const useGetProfilPic = () => {
  const user = useCheckAuth()
  const pic = useMemo(() => {
    if(user && user.picture) return user.picture
    else return "/user.svg"
  }, [user])

  return pic
}

export default useGetProfilPic