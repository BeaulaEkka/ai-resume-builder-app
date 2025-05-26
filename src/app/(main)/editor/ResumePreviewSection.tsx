import { ResumeValues } from "@/lib/validations";
import ModernLayout from "./layoutStyles/ModernLayout";
import ElegantLayout from "./layoutStyles/ElegantLayout";
import DefaultLayout from "./layoutStyles/DefaultLayout";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./components/BorderStyleButton";

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
    <div className="hidden w-1/2 md:flex">
      <div className="group bg-secondary relative flex w-full justify-center overflow-y-auto p-3">
        <div className="opacity-30  absolute top-2 left-2 z-10 flex flex-col gap-2  group-hover:opacity-100 xl-opacity-100">
          <ColorPicker
            color={resumeData.colorHex || "#aabbcc"}
            onChange={(color) =>
              setResumeData({ ...resumeData, colorHex: color })
            }
          />
          <BorderStyleButton
            onChange={(borderStyle) =>
              setResumeData({ ...resumeData, borderStyle })
            }
            borderStyle={resumeData.borderStyle}
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
