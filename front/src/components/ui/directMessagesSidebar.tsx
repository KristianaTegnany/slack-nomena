import React, { useCallback, useState } from 'react';
import { UserItem } from './UserItem';
import { Input } from '@/components/ui/input';
import useGetUserDM from '@/hooks/useGetUserDM';
import { WorkspaceHeader } from './WorkspaceHeader';
import useGetWorkspaceById from '@/hooks/useGetWorkspaceById';
import { WorkspaceSection } from './WorkspaceSection';
import { HashIcon } from 'lucide-react';
import useGetChannels from '@/hooks/useGetChannels';
import { SidebarItem } from './SidebarItem';
import { NewChannelForm } from './newChannelForm';
import useCheckAuth from '@/hooks/useCheckAuth';
import { ChannelType, createChannel } from '@/lib/channel';
import useGetUserFromWS from '@/hooks/useGetUserFromWS';

type Props = { workspaceID: string, userID: string }

const DirectMessagesSidebar = (props: Props) => {
  const { workspaceID } = props
  const currentWorkSpace = useGetWorkspaceById(workspaceID)
  const [isNewChannelFormOpen, setIsNewChannelFormOpen] = useState(false);
  const channels = useGetChannels(workspaceID)
  const users = useGetUserFromWS(workspaceID)
  const user = useCheckAuth()

  const handleNewChannel = useCallback(async (channel: string) => {
      if (user && user.uid && channel.length) {
        const newChannel = {
          name: channel, createdBy: user.uid, workspaceId: workspaceID
        } as ChannelType
        const res = await createChannel(newChannel)
        console.log({ res })
      }
    }, []);

  return (
    <div className="flex flex-col h-full bg-[#5E2C5F] p-4 space-y-6">
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
            variant={"default"}
            workspaceId={workspaceID}
          />
        ))}
      </WorkspaceSection>

      <WorkspaceSection label="Direct Messages" hint="New direct message">
        {users && users.map((item, i) => (
          <UserItem
            id={item.uid}
            image={item.photoURL || "/profil.png"}
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

export default DirectMessagesSidebar;