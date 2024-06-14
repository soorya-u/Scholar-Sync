import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";

import { SignUpType, signUpSchema } from "@/schema/sign-up";
import { useToast } from "@/components/primitives/use-toast";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUp,
});

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", firstName: "", lastName: "", password: "" },
  });
  const { toast } = useToast();

  return (
    <div className="flex min-h-full justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl font-lato">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((val) =>
              toast({
                title: "Registration Successfull!",
                description: JSON.stringify(val),
                variant: "destructive",
              })
            )}
            className="grid gap-4"
          >
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <div className="grid gap-2">
                <Label className="font-lato font-bold" htmlFor="first-name">
                  First name
                </Label>
                <Input
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  id="first-name"
                  placeholder="John"
                  {...register("firstName")}
                />
              </div>
              <div className="grid gap-2">
                <Label className="font-lato font-bold" htmlFor="last-name">
                  Last name
                </Label>
                <Input
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  id="last-name"
                  placeholder="Doe"
                  {...register("lastName")}
                />
              </div>
              <span className="text-red-500 text-xs px-2">
                {errors && errors.firstName && errors.firstName.message}
              </span>
            </div>
            <div className="grid gap-2">
              <Label className="font-lato font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                id="email"
                {...register("email")}
                placeholder="john-doe@example.com"
              />
              <span className="text-red-500 text-xs px-2">
                {errors && errors.email && errors.email.message}
              </span>
            </div>
            <div className="grid gap-2">
              <Label className="font-lato font-bold" htmlFor="password">
                Password
              </Label>
              <Input
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                id="password"
                {...register("password")}
                placeholder={"********"}
                type="password"
              />
              <span className="text-red-500 text-xs px-2">
                {errors && errors.password && errors.password.message}
              </span>
            </div>
            <Button
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              type="submit"
              className="w-full"
            >
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
