import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash.debounce";
import { ChevronDown, ChevronUp, GripHorizontal, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const debouncedValidateAndUpdate = debounce(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      // update the resume preview
      setResumeData({
        ...resumeData,
        educations: values.educations?.filter((edu) => edu !== undefined) || [],
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="spaye-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-muted-foreground text-sm">
          Tell us about your education. This will appear on your resume.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-8">
          {fields.map((field, index) => (
            <EducationFormField
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}{" "}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  institution: "",
                  degree: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EducationFormFieldProps {
  index: number;
  form: UseFormReturn<EducationValues>;
  remove: (index: number) => void;
}

function EducationFormField({ index, form, remove }: EducationFormFieldProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
        <h3 className="text-lg font-semibold">Education {index + 1}</h3>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? (
              <ChevronDown size="5" strokeWidth="3px" />
            ) : (
              <ChevronUp size="5" strokeWidth="3px" />
            )}
          </Button>
          <Button variant="ghost" type="button" onClick={() => remove(index)}>
            <X
              strokeWidth="3px"
              size="5"
              className="text-destructive h-6 w-6 cursor-pointer font-bold"
            />
          </Button>
        </div>
      </div>
      {!isCollapsed && (
        <>
          {/* Institution */}
          <FormField
            control={form.control}
            name={`educations.${index}.institution`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="Institution Name" {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* degree */}
          <FormField
            control={form.control}
            name={`educations.${index}.degree`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="MBA" {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            {" "}
            {/* startDate */}
            <FormField
              control={form.control}
              name={`educations.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={field.value?.slice(0, 10)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* enddate */}
            <FormField
              control={form.control}
              name={`educations.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
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
        </>
      )}
    </div>
  );
}
