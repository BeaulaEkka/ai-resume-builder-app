"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { CreditCard } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-6">
      {/* Logo section */}
      <div className="mx-auto flex h-6 w-[85%] justify-between">
        <div className="mr-6 flex items-center space-x-2 text-white">
          <Image src={logo} alt="Logo" width={60} height={60} />

          <span className="font-semibold tracking-tight text-blue-500 capitalize">
            Ai Resume Builder
          </span>
        </div>

        {/* Navigation + Auth section */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <SignedIn>
            <Link href="/resumes">
              <Button variant="ghost" className="text-white hover:bg-gray-700">
                Dashboard
              </Button>
            </Link>
            <UserButton
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  avatarBox: {
                    width: 35,
                    height: 35,
                  },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Billing"
                  labelIcon={<CreditCard className="size-4" />}
                  href="/billing"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="border-white text-black">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-white text-gray-800">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
