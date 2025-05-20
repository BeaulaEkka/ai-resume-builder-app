import { LayoutPropTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

export default function ModernLayout({
  resumeData,
  className,
}: LayoutPropTypes) {
  return (
    <div
      className={cn("aspect-[210/297] w-full bg-white text-black", className)}
    >
      ModernLayout
    </div>
  );
}
