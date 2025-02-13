"use client";

import { Info, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
type Id<T extends string> = string;

export const Navbar = () => {
  const router = useRouter();
  const workspaceId = "static-workspace-id"; // Static workspace ID

  const workspace = { id: workspaceId, name: "Static Workspace" }; // Static workspace data
  const channels = [
    { id: "1", name: "General" },
    { id: "2", name: "Random" },
  ]; // Static channels data
  const members = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ]; // Static members data

  const [open, setOpen] = useState(false);

  const handleChannelClick = (channelId: Id<"channels">) => () => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/${channelId}`);
  };

  const handleMemberClick = (memberId: Id<"members">) => () => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/member/${memberId}`);
  };

  return (
    <div className="bg-[#481349] flex items-center justify-between h-15 p-1.5">
      <div className="flex-1"></div>
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
          onClick={() => setOpen(true)}
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search in {workspace?.name}</span>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Channels">
              {channels.map((channel) => (
                <CommandItem
                  key={channel.id}
                  onSelect={handleChannelClick(channel.id)}
                >
                  {channel.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Members">
              {members.map((member) => (
                <CommandItem
                  key={member.id}
                  onSelect={handleMemberClick(member.id)}
                >
                  {member.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        {/* TODO: Implement info button */}
          <Button variant="ghost" size="sm" >
            <Info className="size-5 text-white hover:text-primary-light"  />
          </Button>
      </div>
    </div>
  );
};
