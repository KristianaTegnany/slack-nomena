import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InviteModal } from "./InviteModal";
import { PreferenceModal } from "./PreferenceModal";
import { WorkSpaceType } from "@/lib/workspaces";

// Static type definition for Doc
type Doc = {
  id: string;
  name: string;
  description?: string;
  joinCode?: string;
};
interface WorkspaceHeaderProps {
  workspace?: WorkSpaceType;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({
  workspace,
  isAdmin,
}: WorkspaceHeaderProps) => {
  const [preferenceOpen, setPreferenceOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      {
        workspace && <>
          <InviteModal
            open={inviteOpen}
            setOpen={setInviteOpen}
            name={workspace.name}
            joinCode={workspace.id ?? "QWELDKSJDSKJJL"}
          />
          <PreferenceModal
            open={preferenceOpen}
            setOpen={setPreferenceOpen}
            initialVlaue={workspace.name}
          />
          <div className="flex items-center justify-between px-4 h-[60px] gap-0.5">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="font-semibold text-lg w-auto p-1.5 overflow-hidden text-slate-50"
                  size="sm"
                >
                  <span className="truncate">{workspace.name}</span>
                  <ChevronDown className="size-4 ml-1 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" className="w-64">
                <DropdownMenuItem className="cursor-pointer capitalize">
                  <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                    {workspace.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-bold">{workspace.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Active workspace
                    </p>
                  </div>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer py-2"
                      onClick={() => setInviteOpen(true)}
                    >
                      Invite people
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer py-2"
                      onClick={() => setPreferenceOpen(true)}
                    >
                      Setting
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      }
    </>
  );
};
