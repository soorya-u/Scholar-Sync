"use client";

import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useLogin } from "@/hooks/use-auth";

export default function LoginPage() {
  const { errors, handleSubmit, isSubmitting, register } = useLogin();
  const searchParams = useSearchParams();
  const adder = searchParams.get("l");
  const joinId = searchParams.get("j");
  const userId = searchParams.get("u");

  const query =
    adder && joinId && userId ? { l: adder, j: joinId, u: userId } : {};

  return (
    <main className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-lato text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label className="font-lato font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                className="border-2 border-border placeholder:text-gray-500"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                {...register("email")}
                id="email"
                placeholder="john-doe@example.com"
              />
              <span className="px-2 text-xs text-red-500">
                {errors.email?.message}
              </span>
            </div>
            <div className="grid gap-2">
              <Label className="font-lato font-bold" htmlFor="password">
                Password
              </Label>
              <Input
                className="border-2 border-border placeholder:text-gray-500"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                {...register("password")}
                id="password"
                type="password"
                placeholder="********"
              />
              <span className="px-2 text-xs text-red-500">
                {errors.password?.message}
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
              <Link
                href={{ pathname: "/auth/sign-up", query }}
                className="underline"
              >
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
