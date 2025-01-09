import { useToast } from "./use-toast";
import { errorToast } from "@/utils/error-toast";
import {
  useRemoveMemberFromCoreMutation,
  useRemoveMemberFromNexusMutation,
} from "@/generated/graphql";

export const useRemoveNexusMember = () => {
  const [mutate] = useRemoveMemberFromNexusMutation({
    onError: (e) => errorToast(e, "Member Removal from Nexus"),
  });
  const { toast } = useToast();

  const handleClick = async (userId: string, nexusId: string) => {
    await mutate({ variables: { userId, nexusId } }).then(async () =>
      toast({
        title: "Member Removal from Nexus Successfull!",
        description: "Member has been kicked out from Nexus Successfully.",
      }),
    );
  };

  return { handleClick };
};

export const useRemoveCoreMember = () => {
  const [mutate] = useRemoveMemberFromCoreMutation({
    onError: (e) => errorToast(e, "Member Removal from Core"),
  });
  const { toast } = useToast();

  const handleClick = async (userId: string, coreId: string) => {
    await mutate({ variables: { userId, coreId } }).then(async () =>
      toast({
        title: "Member Removal from Core Successfull!",
        description: "Member has been kicked out from Core Successfully.",
      }),
    );
  };

  return { handleClick };
};
