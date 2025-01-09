import { useToast } from "./use-toast";
import { errorToast } from "@/utils/error-toast";
import {
  useDeleteCoreMutation,
  useDeleteNexusMutation,
} from "@/generated/graphql";

export const useDeleteCore = () => {
  const [mutate] = useDeleteCoreMutation({
    onError: (e) => errorToast(e, "Core Deletion"),
  });
  const { toast } = useToast();

  const handleClick = async (coreId: string) => {
    await mutate({ variables: { coreId } }).then(() =>
      toast({
        title: "Core Deletion Successfull!",
        description: "Core has been Successfully Deleted.",
      }),
    );
  };

  return { handleClick };
};

export const useDeleteNexus = () => {
  const [mutate] = useDeleteNexusMutation({
    onError: (e) => errorToast(e, "Nexus Deletion"),
  });
  const { toast } = useToast();

  const handleClick = async (nexusId: string) => {
    await mutate({
      variables: {
        nexusId,
      },
    }).then(async () =>
      toast({
        title: "Nexus Deletion Successfull!",
        description: "Nexus has been Successfully Deleted.",
      }),
    );
  };

  return { handleClick };
};
