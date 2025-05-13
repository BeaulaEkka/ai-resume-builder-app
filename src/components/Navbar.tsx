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

export default function Navbar() {
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
          <SignedIn>
            <Link href="/resumes">
              <Button variant="ghost" className="text-white hover:bg-gray-700">
                Dashboard
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: 45,
                    height: 45,
                  },
                },
              }}
            />
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
