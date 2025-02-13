import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
type Id = string; // Static type definition for Id


const userItemVariants = cva(
  "flex items-center gap-3 justify-start font-normal h-10 px-6 text-lg overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#F9EDFFCC]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface UserItemProps {
  id: Id;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
  workspaceId: string,
}

export const UserItem = ({ id, image, label, variant, workspaceId }: UserItemProps) => {

  return (
    <Button
      variant="ghost"
      className={cn(userItemVariants({ variant }))}
      size="lg"
      asChild
    >
      <Link href={`/workspace/${workspaceId}/DM/${id}`}>
        <Avatar className="size-6 rounded-md mr-1">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
            {label?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-md truncate">{label}</span>
      </Link>
    </Button>
  );
};
