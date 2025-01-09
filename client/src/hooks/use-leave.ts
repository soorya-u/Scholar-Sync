import { useToast } from "./use-toast";
import { errorToast } from "@/utils/error-toast";
import { useLeaveNexusMutation } from "@/generated/graphql";

export const useLeaveNexus = () => {
  const [mutate] = useLeaveNexusMutation({
    onError: (e) => errorToast(e, "Exiting Nexus"),
  });
  const { toast } = useToast();

  const handleClick = async (nexusId: string) => {
    await mutate({ variables: { nexusId } }).then(async () =>
      toast({
        title: "Exiting Nexus Successfull!",
        variant: "default",
        description: "Nexus has been Successfully Exited.",
      }),
    );
  };

  return { handleClick };
};
