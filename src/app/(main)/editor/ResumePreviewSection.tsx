import { ResumeValues } from "@/lib/validations";
import ModernLayout from "./layoutStyles/ModernLayout";
import ElegantLayout from "./layoutStyles/ElegantLayout";
import DefaultLayout from "./layoutStyles/DefaultLayout";
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  selectedLayout?: "default" | "modern" | "elegant";
}
export default function ResumePreviewSection({
  resumeData,
  setResumeData,

  selectedLayout = "default",
}: ResumePreviewSectionProps) {
  const layoutComponents = {
    default: DefaultLayout,
    modern: ModernLayout,
    elegant: ElegantLayout,
  };

  const SelectedLayoutComponent = layoutComponents[selectedLayout];

  return (
    <div className="relative hidden w-1/2 md:flex">
      <div className="bg-secondary flex w-full justify-center overflow-y-auto border border-red-500 p-3">
        <div className="absolute top-0 left-0 z-10">
          <ColorPicker
            color={resumeData.colorHex || "#aabbcc"}
            onChange={(color) =>
              setResumeData({ ...resumeData, colorHex: color })
            }
          />
        </div>
        <SelectedLayoutComponent
          resumeData={resumeData}
          className="max-w-2xl p-8 shadow-md"
        />
      </div>
    </div>
  );
}
