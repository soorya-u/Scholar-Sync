import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/primitives/button";
import Gradient from "@/components/custom/Gradient";

export default function Home() {
  return (
    <div className="relative overflow-y-hidden">
      <Gradient />
      <main className="relative flex min-h-screen flex-col items-center justify-center gap-7 overflow-y-auto">
        <header className="flex w-full items-center justify-between px-4 pt-4 xs:px-8">
          <h1 className="font-playwrite text-2xl text-primary 3xs:text-3xl">
            Scholar Sync
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Button
              className="text-md hidden border-[3px] bg-transparent font-kanit transition-all duration-300 hover:opacity-70 2xs:flex"
              variant="outline"
            >
              <Link href="/auth/login ">Login</Link>
            </Button>
            <Button
              className="text-md hidden bg-primary font-kanit transition-all duration-300 hover:opacity-60 2xs:flex"
              variant="default"
            >
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>

            <Button
              className="text-md flex bg-primary font-kanit transition-all duration-300 hover:opacity-60 2xs:hidden"
              variant="default"
            >
              <Link href="/auth/sign-up">Join</Link>
            </Button>
          </div>
        </header>
        <section className="flex flex-1 flex-col items-center justify-center gap-6">
          <Image
            priority
            src="/logo.png"
            alt="logo"
            height={7 * 16}
            width={7 * 16}
          />
          <h1 className="w-11/12 text-wrap text-center font-kanit text-6xl text-primary">
            Virtual Classroom at Your Fingertips.{" "}
          </h1>
          <h2 className="w-2/3 text-center font-lato text-lg font-bold text-foreground/70 2xs:text-xl">
            Immerse yourself in a structured educational experience,
            effortlessly managing announcements, file uploads, and user
            hierarchies to enhance your academic workflow.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            <Button
              className="text-md bg-transparent font-kanit transition-all duration-300 hover:bg-primary"
              variant="outline"
            >
              <Link href="/dashboard">Navigate to Dashboard</Link>
            </Button>
            <Button
              className="text-md bg-transparent font-kanit transition-all duration-300 hover:bg-primary"
              variant="outline"
            >
              <Link href="/link/demo">Join Demo Core</Link>
            </Button>
          </div>
        </section>
        <footer className="m-auto flex min-h-16 w-[85vw] flex-col items-center justify-between gap-y-4 border-t-[2px] border-t-primary py-3 md-lg:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <Image
              src="/logo.png"
              width={28}
              height={28}
              alt="Elite-AIML-Logo"
            />
            <p className="text-center font-kanit text-foreground/60">
              Built by{" "}
              <Link
                href="https://twitter.com/sooryaa_u"
                className="underline underline-offset-2"
                target="_blank"
              >
                soorya-u
              </Link>
              . The source code is available on{" "}
              <Link
                href="https://github.com/soorya-u/Scholar-Sync"
                className="underline underline-offset-2"
                target="_blank"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <p className="text-center font-kanit text-foreground/60">
              Check these Projects Out:
            </p>
            <Link href="https://grade-grove.soorya-u.dev" target="_blank">
              <Image
                src="https://grade-grove.soorya-u.dev/logo.png"
                width={28}
                height={28}
                alt="Grade-Grove-Logo"
                className="rounded-md bg-foreground/70"
              />
            </Link>
            <Link href="https://belief.soorya-u.dev" target="_blank">
              <Image
                src="https://belief.soorya-u.dev/logo.png"
                width={28}
                height={28}
                alt="Belief-Logo"
              />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
