"use client";

import { Bell, Home, MessagesSquare, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { UserButton } from "@/components/ui/user-button";
import { SidebarButton } from "./SidebarButton";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

type Props = {
  workspaceid: string
}

export const Sidebar = ({ workspaceid }: Props) => {
  const router = useRouter()
  const pathname = usePathname()!;

  return (
    <div className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <WorkspaceSwitcher workspaceid={workspaceid} />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace") && !(pathname.includes("/DM") || pathname.includes("/activities") ) || pathname.includes("/setting") }
        onClick={() => router.push(`/workspace/${workspaceid}`)}
      />
      {/* <SidebarButton icon={MessagesSquare} label="DMs" isActive={pathname.includes("/DM")} /> */}
      <SidebarButton onClick={() => router.push(`/workspace/${workspaceid}/activities`)} icon={Bell} label="Activity" isActive={pathname.includes("/activities")} />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </div>
  );
};
