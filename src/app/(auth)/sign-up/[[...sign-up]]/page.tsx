import { SignUp } from "@clerk/nextjs";

export interface PageProps {
  prop: string;
}

export default function Page({}: PageProps) {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignUp />
    </main>
  );
}
