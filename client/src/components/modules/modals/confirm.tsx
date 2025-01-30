import { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";

type ConfirmModalProps = PropsWithChildren & {
  title: string;
  description: string;
  actionTitle: string;
  completeFn: () => Promise<void>;
  fnActionType: "default" | "destructive";
};

export default function ConfirmModal({
  title,
  description,
  actionTitle,
  children,
  completeFn,
  fnActionType = "default",
}: ConfirmModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-[425px]">
        <DialogTitle className="text-base">{title}</DialogTitle>
        <DialogDescription className="text-sm">{description}</DialogDescription>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={completeFn} variant={fnActionType}>
              {actionTitle}
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
