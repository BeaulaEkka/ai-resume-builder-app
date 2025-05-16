import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResumeValues, workExperienceSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface WorkExperienceFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: WorkExperienceFormProps) {
  const form = useForm({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      postion: resumeData.position || "",
      company: resumeData.company || "",
      startDate: resumeData.startDate || "",
      endDate: resumeData.endDate || "",
      description: resumeData.description || "",
    },
  });

  useEffect(() => {
    const debouncedValidateAndUpdate = debounce(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      // update the resume preview
      setResumeData({ ...resumeData, ...values });
    }, 500); // wait 500ms after the user stops typing

    const subscription = form.watch((values) => {
      debouncedValidateAndUpdate(values);
    });

    return () => {
      subscription.unsubscribe(); // cleanup
      debouncedValidateAndUpdate.cancel(); // cancel any pending calls
    };
  }, [form, resumeData, setResumeData]);
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-muted-foreground text-sm">
          Add your work experience. This will appear on your resume.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="workExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Experience</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Software Engineer at XYZ Company"
                    {...field}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add more fields as needed */}
        </form>
      </Form>
    </div>
  );
}
