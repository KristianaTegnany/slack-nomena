import { useParams } from "next/navigation";

// import { Id } from "../../convex/_generated/dataModel";
type Id<T> = string;

export const useMemberId = () => {
  const params = useParams();

  return params.memberId as Id<"members">;
};
