import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SummaryForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const debouncedValidateAndUpdate = debounce(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      // update the resume preview
      setResumeData({
        ...resumeData,
        ...values,
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
    <div>
      <div className="spaye-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Summary</h2>
        <p className="text-muted-foreground text-sm">
          Tell us about yourself. This will appear on your resume.
        </p>
      </div>
      <Form {...form}>
        <form action="">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-40"
                    placeholder="Tell us about yourself.."
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
