import useGetUserById from "@/hooks/useGetUserById"
import { ActivityType } from "@/lib/activity"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Typography from "./typography"

const ActivityItem = (props: ActivityType) => {
  const activity = props
  const route = useRouter()
  const user = useGetUserById(activity.userId)
  return <div onClick={() => {
    route.push(`/workspace/${activity.workspaceId}/${activity.channelId}`)
  }} className="flex items-start w-full gap-2 mt-8 cursor-pointer border-b">
    {user ? <>
      <Image src={user.photoURL || "/user.svg"} width={48} height={48} alt="User avatar" className="rounded-full" />
      <div className="w-full">
        <div className="inline-flex gap-4 items-baseline">
          <Typography text={user.displayName} variant="p" className="font-semibold text-slate-700" />
          {activity.createdAt && <p className="text-slate-400 text-[11px]">{activity.createdAt}</p>}
        </div>
        <Typography text={activity.desciption} variant="p" className="text-slate-500" />
      </div>

    </> : "loading..."}
  </div>
}

export default ActivityItem