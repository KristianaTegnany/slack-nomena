import { ChannelType, getChannels } from "@/lib/channel"
import { useEffect, useState } from "react"

const useGetChannels = (workspaceId: string) => {
  const [channels, setChannels] = useState<ChannelType[]>()
  useEffect(() => {
    getChannels(workspaceId).then(res => {
      console.log({res})
      setChannels(res.channels)
    })
  }, [])

  return channels
}

export default useGetChannels