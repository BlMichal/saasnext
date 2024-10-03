import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/next.svg";
import { ThemeToggle } from "../ThemeToggle";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import HeroImage from '@/public/hero.png';

export default function Hero() {
  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={Logo} alt="logo" className="size-20 dark:invert" />
            <h4 className="text-xl font-semibold">
              Saas<span className="text-primary">Blog</span>
            </h4>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant={"secondary"}>Sign up</Button>
          </RegisterLink>
        </nav>
      </div>

      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full py-12 lg:py-20">
          <div className="text-center">
            <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
              Blogging Saas for Start
            </span>
            <h1 className="mt-8 text-responsive">
              Setup your "[Blog]"
              <span className="block text-primary">on few clicks!</span>
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
              Setting own blog was never easier. We make it easy for you to
              create a blog.
            </p>
            <div className="flex items-center gap-x-4 w-full justify-center mt-8">
            <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant={"secondary"}>Sign up</Button>
          </RegisterLink>
            </div>
          </div>
          <div className="relative items-center w-full py-12 mx-auto">
            <Image src={HeroImage} alt="Hero image" className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"></Image>
          </div>
        </div>
      </section>
    </>
  );
}
