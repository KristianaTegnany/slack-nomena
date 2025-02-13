"use client"

import { useEffect, useState } from "react"
import { getWorkspaceById, WorkSpaceType } from "@/lib/workspaces"

const useGetWorkspaceById = (id: string) => {
  const [workspace, setWorkspaces] = useState<WorkSpaceType>()

  useEffect(() => {
    getWorkspaceById(id).then(res => {
      setWorkspaces(res)
    })
  }, [])

return workspace
}

export default useGetWorkspaceById