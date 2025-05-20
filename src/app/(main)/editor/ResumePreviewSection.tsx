import { ResumeValues } from "@/lib/validations";
import ModernLayout from "./layoutStyles/ModernLayout";
import ElegantLayout from "./layoutStyles/ElegantLayout";
import DefaultLayout from "./layoutStyles/DefaultLayout";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  selectedLayout?: "default" | "modern" | "elegant";
}
export default function ResumePreviewSection({
  resumeData,

  selectedLayout = "default",
}: ResumePreviewSectionProps) {
  const layoutComponents = {
    default: DefaultLayout,
    modern: ModernLayout,
    elegant: ElegantLayout,
  };

  const SelectedLayoutComponent = layoutComponents[selectedLayout];

  return (
    <div className="hidden w-1/2 md:flex">
      <div className="bg-secondary flex w-full justify-center overflow-y-auto border border-red-500 p-3">
        <SelectedLayoutComponent
          resumeData={resumeData}
          className="max-w-2xl p-8 shadow-md"
        />
      </div>
    </div>
  );
}
