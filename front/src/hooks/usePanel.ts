import { useQueryState } from "nuqs";


export const useProfileMemberId = () => {
  return useQueryState("profilememberId");
};
export const useParentMessageId = () => {
  return useQueryState("parentMessageId");
};

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] = useParentMessageId();
  const [profileMemberId, setProfileMemberId] = useProfileMemberId();

  const openProfile = (memberId: string) => {
    setProfileMemberId(memberId);
    setParentMessageId(null);
  };

  const openMessage = (messageId: string) => {
    setParentMessageId(messageId);
    setProfileMemberId(null);
  };

  const close = () => {
    setParentMessageId(null);
    setProfileMemberId(null);
  };

  return {
    parentMessageId,
    profileMemberId,
    openProfile,
    openMessage,
    close,
  };
};
