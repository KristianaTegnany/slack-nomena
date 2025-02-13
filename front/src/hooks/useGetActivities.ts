import { ActivityType, getActivities } from "@/lib/activity"
import { useEffect, useState } from "react"

const useGetActivities = (wsId: string) => {
  const [activities, setActivities] = useState<ActivityType[]>([])
  useEffect(() => {
    getActivities(wsId).then((res: ActivityType[]) => {
      setActivities(res)
    })
  })
  return activities.sort((a1, a2) => new Date(a2.createdAt!) - new Date(a1.createdAt!))
}

export default useGetActivities