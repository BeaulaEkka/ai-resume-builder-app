import { Form } from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="spaye-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-muted-foreground text-sm">
          Tell us about your education. This will appear on your resume.
        </p>
      </div>
      <Form {...form}></Form>
    </div>
  );
}
