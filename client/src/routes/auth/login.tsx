import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

import { Label } from "@/components/primitives/label";
import { Button } from "@/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Input } from "@/components/primitives/input";

import { loginSchema, LoginType } from "@/schema/login";
import { useToast } from "@/components/primitives/use-toast";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { toast } = useToast();

  return (
    // TODO: Add a Header or Something
    <div className="flex min-h-full justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-lato">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit((val) =>
            toast({
              title: "Registration Successfull!",
              description: JSON.stringify(val),
              variant: "destructive",
            })
          )}
        >
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label className="font-lato font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                {...register("email")}
                id="email"
                placeholder="john-doe@example.com"
                required
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
                {...register("password")}
                id="password"
                type="password"
                placeholder="********"
                required
              />
              <span className="text-red-500 text-xs px-2">
                {errors && errors.password && errors.password.message}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              type="submit"
              className="w-full"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Sign in"
              )}
            </Button>
            <div className="mt-4 text-center text-sm">
              Do not have an account?{" "}
              <Link to="/auth/sign-up" className="underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
