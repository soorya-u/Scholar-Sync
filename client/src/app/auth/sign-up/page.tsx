"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

import { useSignUp } from "@/hooks/use-auth";

export default function SignUpPage() {
  const { errors, handleSubmit, isSubmitting, register } = useSignUp();
  const searchParams = useSearchParams();
  const adder = searchParams.get("l");
  const joinId = searchParams.get("j");
  const userId = searchParams.get("u");
  const demo = searchParams.get("demo");

  const query =
    adder && joinId && userId
      ? {
          l: adder,
          j: joinId,
          u: userId,
        }
      : demo
        ? { demo: "true" }
        : {};

  return (
    <main className="flex min-h-full items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="font-lato text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="grid gap-2">
                <Label className="font-lato font-bold" htmlFor="first-name">
                  First name
                </Label>
                <Input
                  className="border-2 border-border"
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
                  className="border-2 border-border"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  id="last-name"
                  placeholder="Doe"
                  {...register("lastName")}
                />
              </div>
              <span className="px-2 text-xs text-red-500">
                {errors && errors.firstName && errors.firstName.message}
              </span>
            </div>
            <div className="grid gap-2">
              <Label className="font-lato font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                className="border-2 border-border"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                id="email"
                {...register("email")}
                placeholder="john-doe@example.com"
              />
              <span className="px-2 text-xs text-red-500">
                {errors && errors.email && errors.email.message}
              </span>
            </div>
            <div className="grid gap-2">
              <Label className="font-lato font-bold" htmlFor="password">
                Password
              </Label>
              <Input
                className="border-2 border-border"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                id="password"
                {...register("password")}
                placeholder={"********"}
                type="password"
              />
              <span className="px-2 text-xs text-red-500">
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
            <Link
              href={{ pathname: "/auth/login", query }}
              className="underline"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
