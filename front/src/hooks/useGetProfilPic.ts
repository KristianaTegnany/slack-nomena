import { useMemo } from "react"
import useCheckAuth from "./useCheckAuth"

const useGetProfilPic = () => {
  const user = useCheckAuth()
  const pic = useMemo(() => {
    if(user && user.picture) return user.picture
    else return "/profil.png"
  }, [user])

  return pic
}

export default useGetProfilPic