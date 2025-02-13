"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCheckAuth from "@/hooks/useCheckAuth";
import useGetProfilPic from "@/hooks/useGetProfilPic";
import { logout } from "@/lib/auth";
import { Loader, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const router = useRouter()
  const signOut = () => {
    logout()
    router.push('login')
  };

  const isLoading = false;
  const user = useCheckAuth()

  const image = useGetProfilPic()

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="rounded-md size-10 hover:opacity-75 transition">
          <AvatarImage
            className="rounded-md"
            alt={user.name}
            src={image}
          />
          <AvatarFallback className="rounded-md bg-sky-500 text-white ">
            {user.name!.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60 py-0">
        <DropdownMenuItem onClick={() => signOut()} className="h-10">
          <LogOutIcon className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
