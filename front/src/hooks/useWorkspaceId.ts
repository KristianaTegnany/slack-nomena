import { useParams } from "next/navigation";

type Id<T> = string;

export const useWorkspaceId = () => {
  const params = useParams();

  return params.workspaceId as Id<"workspaces">;
};
