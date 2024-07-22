import { useEffect } from "react";
import { useMutation } from "@apollo/client";

import {
  deleteCoreMutation,
  deleteNexusMutation,
  leaveNexusMutation,
} from "@/graphql/mutations";
import { useInitData } from "./use-init";
import { useToast } from "@/components/primitives/use-toast";

export const useDeleteCore = () => {
  const [mutate, { data, error }] = useMutation(deleteCoreMutation);
  const { refetch } = useInitData();
  const { toast } = useToast();

  const handleClick = async (coreId: string) => {
    await mutate({
      variables: {
        coreId,
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Core Deletion Unsuccessfull!",
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase(),
        ),
      });
      return;
    }

    if (data) {
      toast({
        title: "Core Deletion Successfull!",
        variant: "default",
        description: "Core has been Successfully Deleted.",
      });

      refetch();
    }
  }, [data, error]);

  return {
    handleClick,
  };
};

export const useDeleteNexus = () => {
  const [mutate, { data, error }] = useMutation(deleteNexusMutation);
  const { refetch } = useInitData();
  const { toast } = useToast();

  const handleClick = async (nexusId: string) => {
    await mutate({
      variables: {
        nexusId,
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Nexus Deletion Unsuccessfull!",
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase(),
        ),
      });
      return;
    }

    if (data) {
      toast({
        title: "Nexus Deletion Successfull!",
        variant: "default",
        description: "Nexus has been Successfully Deleted.",
      });

      refetch();
    }
  }, [data, error]);

  return {
    handleClick,
  };
};

export const useLeaveNexus = () => {
  const [mutate, { data, error }] = useMutation(leaveNexusMutation);
  const { refetch } = useInitData();
  const { toast } = useToast();

  const handleClick = async (nexusId: string) => {
    await mutate({
      variables: {
        nexusId,
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Exiting Nexus was Unsuccessfull!",
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase(),
        ),
      });
      return;
    }

    if (data) {
      toast({
        title: "Exiting Nexus Successfull!",
        variant: "default",
        description: "Nexus has been Successfully Exited.",
      });

      refetch();
    }
  }, [data, error]);

  return {
    handleClick,
  };
};