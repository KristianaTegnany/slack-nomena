"use client";

import { Loader, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetWorkspace from "@/hooks/useGetWorkspace";
import { useEffect, useState } from "react";
import { WorkSpaceType } from "@/lib/workspaces";

type Props = {
  workspaceid: string
}

export const WorkspaceSwitcher = ({ workspaceid }: Props) => {
  const router = useRouter();
  
  const isLoadingWorkspace = false;


  const workspaces = useGetWorkspace()

  const [currentWorkspace, setWorkspace] = useState<WorkSpaceType>();

  useEffect(() => {
    setWorkspace(workspaces.find(one => one.id === workspaceid)!)
  }, [workspaceid, workspaces])

  const filteredWorkspaces = workspaces.filter(
    (workspace) => workspace.id !== currentWorkspace?.id
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="outline-none relative">
        <Button className="size-9 relateive overflow-hidden bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xl">
          {isLoadingWorkspace ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            currentWorkspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom" className="w-100">
        <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start capitalize">
          {currentWorkspace?.name}
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => router.push(`/workspace/${workspace.id}`)}
            className="cursor-pointer capitalize overflow-hidden"
          >
            <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push('/workspace/create')}
        >
          <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            <PlusIcon />
          </div>
          Create new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};