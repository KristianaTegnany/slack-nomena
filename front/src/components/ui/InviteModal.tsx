"use client"
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { createInvitation, InvitationType } from "@/lib/invitation";
import useCheckAuth from "@/hooks/useCheckAuth";
interface InviteModalProps {
  open: boolean;
  joinCode: string;
  name: string;
  setOpen: (open: boolean) => void;
}

export const InviteModal = ({
  open,
  joinCode,
  name,
  setOpen,
}: InviteModalProps) => {

  const [invitation, setInvitation] = useState<InvitationType>()
  const user = useCheckAuth()

  const onCreateInvitaion = useCallback(() => {
    if (user && user.uid && !invitation) {
      console.log("here!")
      createInvitation({ workspaceId: joinCode, inviterId: user.uid }).then(res => {
        console.log("here2!")
        console.log({ res })
        if (res && res.invitation) {
          setInvitation(res.invitation)
        }
      })
    }
  }, [user])

  const handleCopy = useCallback(() => {
    if (invitation) {
      const inviteLink = `http://localhost:3000/invitation/${invitation.id}`;

      navigator.clipboard
        .writeText(inviteLink)
        .then(() => toast.success("Invite link copied to clipboard"));
    }
  }, [invitation]);


  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>
              use the unique link below to invite a person to your workspace
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            {
              invitation ? <>
              <p className="text tracking-widest">
                `http://localhost:3000/invitation/${invitation.id}`
              </p>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                Copy link
                <CopyIcon className="size-4 ml-2" />
              </Button>
            </> :
            <Button variant="default" size="sm" onClick={onCreateInvitaion}>
              Create Invitation
            </Button>
            }
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
