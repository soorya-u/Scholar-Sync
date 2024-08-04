import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import {
  deleteCoreMutation,
  deleteNexusMutation,
  leaveNexusMutation,
  removeUserFromNexusMutation,
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
    }).then(async () => await refetch());
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
    }).then(async () => await refetch());
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
    }).then(async () => await refetch());
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
    }
  }, [data, error]);

  return {
    handleClick,
  };
};

export const useRemoveUser = () => {
  const [mutate, { data, error }] = useMutation(removeUserFromNexusMutation);
  const { refetch } = useInitData();
  const { toast } = useToast();

  const handleClick = async (userId: string, nexusId: string) => {
    await mutate({
      variables: {
        userId,
        nexusId,
      },
    }).then(async () => await refetch());
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "User Removal was Unsuccessfull!",
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
        title: "User Removal Successfull!",
        variant: "default",
        description: "User has been kicked out Successfully.",
      });
    }
  }, [data, error]);

  return {
    handleClick,
  };
};
