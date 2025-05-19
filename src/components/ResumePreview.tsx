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
    <div
      className={cn("aspect-[210/297] w-full bg-white text-black", className)}
    >
      <h1 className="p-6 text-3xl font-bold">
        This text should change the size of the container div
      </h1>
      <div>
        <PersonalInfoHeader resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{resumeData.title}</h1>
      <p className="text-lg">{resumeData.description}</p>
    </div>
  );
}
