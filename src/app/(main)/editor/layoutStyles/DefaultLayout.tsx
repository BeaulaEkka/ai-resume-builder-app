import PersonalInfoHeader from "@/app/(main)/editor/components/PersonalInfoHeader";
import { LayoutPropTypes } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function DefaultLayout({
  resumeData,
  className,
}: LayoutPropTypes) {
  return (
    <div
      className={cn("aspect-[210/297] w-full bg-white text-black", className)}
    >
      <h1 className="p-6 text-3xl font-bold">
        {/* This text should change the size of the container div */}
      </h1>
      <div>
        <PersonalInfoHeader resumeData={resumeData} />
      </div>
    </div>
  );
}
