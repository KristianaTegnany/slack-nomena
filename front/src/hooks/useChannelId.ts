import { useParams } from "next/navigation";

// import { Id } from "../../convex/_generated/dataModel";
type Id<T> = string;

export const useChannelId = () => {
  const params = useParams();

  return params.channelId as Id<"channels">;
};
