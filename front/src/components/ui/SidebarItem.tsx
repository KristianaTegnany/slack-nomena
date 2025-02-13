import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  disabled?: boolean;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
  workspaceId: string;
}

const sidebarItemVariants = cva(
  "flex items-center gap-2 justify-start font-normal h-7 py-5 px-[18px] text-sm overflow-hidden",
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

export const SidebarItem = ({
  icon: Icon,
  id,
  label,
  disabled,
  variant,
  workspaceId
}: SidebarItemProps) => {

  if (disabled) {
    return (
      <Button
        variant="ghost"
        className={cn(sidebarItemVariants({ variant }))}
        disabled={disabled}
      >
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-lg truncate">{label}</span>
      </Link>
    </Button>
  );
};
