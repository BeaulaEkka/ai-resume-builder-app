import { Button } from "@/components/ui/button";
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
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import debounce from "lodash.debounce";
import { ChevronDown, ChevronUp, GripHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const debouncedValidateAndUpdate = debounce(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      // update the resume preview
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    }, 500); // wait 500ms after the user stops typing

    const subscription = form.watch((values) => {
      debouncedValidateAndUpdate(values);
    });

    return () => {
      subscription.unsubscribe(); // cleanup
      debouncedValidateAndUpdate.cancel(); // cancel any pending calls
    };
  }, [form, resumeData, setResumeData]);

  //useField is used to create a controlled input field
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="spaye-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <p className="text-muted-foreground text-sm">
          Tell us about your work experience. This will appear on your resume.
        </p>
      </div>
      <Form {...form}>
        <form action="" className="space-y-3">
          {fields.map((field, index) => (
            <WorkExperienceFormField
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface WorkExperienceFormFieldProps {
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}
function WorkExperienceFormField({
  form,
  index,
  remove,
}: WorkExperienceFormFieldProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="gap- flex justify-between">
        <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
        <span className="font-semibold">Work Experience {index + 1}</span>
        {/* <Button variant="destructive" onClick={() => remove(index)}>
          Remove
        </Button> */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
          <X
            onClick={() => remove(index)}
            className="text-destructive h-6 w-6 cursor-pointer"
          />
        </div>
      </div>
      {/**Position */}
      {!isCollapsed && (
        <>
          <FormField
            control={form.control}
            name={`workExperiences.${index}.position`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/**Company */}
          <FormField
            control={form.control}
            name={`workExperiences.${index}.company`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            {/**Start Date */}
            <FormField
              control={form.control}
              name={`workExperiences.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company Name"
                      {...field}
                      type="date"
                      value={field.value?.slice(0, 10)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/**End Date */}
            <FormField
              control={form.control}
              name={`workExperiences.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company Name"
                      {...field}
                      type="date"
                      value={field.value?.slice(0, 10)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription>
            Leave <span className="font-semibold">end date</span> empty if you
            are currently working here.
          </FormDescription>
          {/**Description */}
          <FormField
            control={form.control}
            name={`workExperiences.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
}
