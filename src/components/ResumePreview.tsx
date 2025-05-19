import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validations";

export interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  return (
    <div className={cn("aspect-[210/297] w-full bg-red-500", className)}>
      <h1 className="p-6 text-3xl font-bold">
        This text should change the size of the container div
      </h1>
    </div>
  );
}
