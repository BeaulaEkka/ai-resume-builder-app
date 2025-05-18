import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash.debounce";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  useEffect(() => {
    const debouncedValidateAndUpdate = debounce(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      // update the resume preview
      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    }, 500);

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
      <div className="spaye-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-muted-foreground text-sm">
          Tell us about your Skills. This will appear on your resume.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g: React, JavaScript, TypeScript, etc."
                    onChange={(e) => {
                      const skills = e.target.value.split(",");
                      field.onChange(skills);
                    }}
                    className="min-h-20 resize-y overflow-hidden"
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Seperate each skill with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
