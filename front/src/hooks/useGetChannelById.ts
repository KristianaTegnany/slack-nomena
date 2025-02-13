import { ChannelType, getChannelById } from "@/lib/channel"
import { useEffect, useState } from "react"

const useGetChannelById = (workspaceId: string, channelId: string) => {
  const [channel, setChannel] = useState<ChannelType>()
  useEffect(() => {
    getChannelById(workspaceId, channelId).then(res => {
      setChannel(res)
    })
  }, [])
  return channel
}

export default useGetChannelById