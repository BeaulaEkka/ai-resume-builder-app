import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validations";

export interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

// export default function ResumePreview({
//   resumeData,
//   className,
// }: ResumePreviewProps) {
//   return (
//     <div className={cn("aspect-[210/297] w-full bg-white text-black", className)}>
//       <h1 className="p-6 text-3xl font-bold">
//         This text should change the size of the container div
//       </h1>
//     </div>
//   );
// }


export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <div
        className={cn(
          "aspect-[210/297] bg-white text-black shadow-md",
          // Width scales with viewport, height follows via aspect ratio
          "w-[calc(100vw-4rem)] max-w-[800px] p-[calc(1vw+0.5rem)]",
          "text-[calc(0.8vw+0.5rem)]",
        )}
      >
        <h1 className="font-bold">
          This text scales with the container using calc()
        </h1>
      </div>
    </div>
  );
}
  