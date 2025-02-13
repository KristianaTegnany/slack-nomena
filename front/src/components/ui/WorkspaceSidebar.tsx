
import { useCallback, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { UserItem } from "@/components/ui/UserItem";
import { WorkspaceHeader } from "@/components/ui/WorkspaceHeader";
import { WorkspaceSection } from "@/components/ui/WorkspaceSection";
import { NewChannelForm } from "./newChannelForm";
import useGetChannels from "@/hooks/useGetChannels";
import useGetWorkspaceById from "@/hooks/useGetWorkspaceById";
import useCheckAuth from "@/hooks/useCheckAuth";
import { ChannelType, createChannel } from "@/lib/channel";
import useGetUserFromWS from "@/hooks/useGetUserFromWS";
import { HashIcon } from "lucide-react";

type Props = { workspaceID: string, channelID: string }

export const WorkspaceSidebar = (props: Props) => {
  const { workspaceID, channelID } = props
  const [isNewChannelFormOpen, setIsNewChannelFormOpen] = useState(false);
  const channels = useGetChannels(workspaceID)
  const currentWorkSpace = useGetWorkspaceById(workspaceID)
  const user = useCheckAuth()
  const usersOnWS = useGetUserFromWS(workspaceID)

  const handleNewChannel = useCallback((channel: string) => {
    if (user && user.uid && channel.length) {
      const newChannel = {
        name: channel, createdBy: user.uid, workspaceId: workspaceID
      } as ChannelType
      createChannel(newChannel).then(console.log)
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full">
      <WorkspaceHeader workspace={currentWorkSpace} isAdmin={true} />
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={() => setIsNewChannelFormOpen(true)}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.name}
            icon={HashIcon}
            id={item.id!}
            variant={channelID === item.id ? "active" : "default"}
            workspaceId={workspaceID}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection label="Direct Messages" hint="New direct message">
        {usersOnWS && usersOnWS.map((item, i) => (
          <UserItem
            id={item.uid}
            image={item.photoURL || "/user.svg"}
            key={JSON.stringify(item) + i}
            label={item.displayName}
            variant={"default"}
            workspaceId={workspaceID}
          />
        ))}
      </WorkspaceSection>
      {isNewChannelFormOpen && (
        <NewChannelForm
          onClose={() => setIsNewChannelFormOpen(false)}
          onSubmit={handleNewChannel}
        />
      )}
    </div>
  );
};


