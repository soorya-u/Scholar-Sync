"use client";

import Link from "next/link";

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
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
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
              <span className="text-red-500 text-xs px-2">
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
                {...(register("email"), { required: false })}
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
                className="border-2 border-border"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                id="password"
                {...(register("password"), { required: false })}
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
            <Link href="/auth/login" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
