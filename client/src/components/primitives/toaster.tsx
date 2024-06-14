"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/primitives/toast";
import { useToast } from "@/components/primitives/use-toast";
import { cn } from "@/utils/cn";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle
                  className={cn(
                    "font-lato text-base",
                    props.variant === "destructive" && "text-red-500"
                  )}
                >
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
