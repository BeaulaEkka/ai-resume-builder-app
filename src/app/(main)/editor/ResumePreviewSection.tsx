import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validations";
import React from "react";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}
export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="hidden w-1/2 md:flex">
      <ResumePreview resumeData={resumeData} />
    </div>
  );
}
