"use client";
import { BreadCrumbs } from "./BreadCrumbs";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validations";

export default function ResumeEditor() {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>({});

  const currentStep = searchParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams}`); //this can also be achieved with router.push(`/editor?${newSearchParams}`); but there is a delay
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="space-y-1 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your resume. Your progress will be
          automatically saved.{" "}
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div className="w-full overflow-y-auto p-3 md:w-1/2">
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border" />
          <div className="hidden w-1/2 md:flex">
            right
            <pre>{JSON.stringify(resumeData, null, 2)}</pre>
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}
