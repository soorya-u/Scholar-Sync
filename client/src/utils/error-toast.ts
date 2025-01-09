import { ApolloError } from "@apollo/client";

import { toast } from "@/hooks/use-toast";

export const errorToast = (e: ApolloError, task: string = "") => {
  toast({
    title: !!task ? `${task} Unsuccessfull!` : "Something went wrong",
    variant: "destructive",
    description: e.message,
  });
};
