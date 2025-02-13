"use client"

import { useEffect, useState} from "react"
import useCheckAuth from "./useCheckAuth"
import { getWorkspaces, WorkSpaceType } from "@/lib/workspaces"

const useGetWorkspace = () => {
  const user = useCheckAuth()
  const [workspaces, setWorkspaces] = useState<WorkSpaceType[]>([])
  
  useEffect(() => {
    if(user) {
      getWorkspaces(user.uid).then(res => {
        console.log({res})
        setWorkspaces(res)
      })
    }
  }, [user])

  return workspaces
}

export default useGetWorkspace