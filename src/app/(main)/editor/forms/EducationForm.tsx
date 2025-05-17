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
import React, { useEffect } from "react";
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
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education {index + 1}</h3>
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>

      {/* Add your form fields here */}
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
    </div>
  );
}
