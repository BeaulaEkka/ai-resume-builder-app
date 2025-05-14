import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Resumes",
};
export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div>resumes</div>
      <Button asChild>
        <Link href={"/editor"}>
          <PlusSquare className="size-5" />
          New Resume{" "}
        </Link>
      </Button>
    </main>
  );
}
