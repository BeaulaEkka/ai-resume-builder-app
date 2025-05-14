import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalInfoFormSchema, GeneralInfoValues } from "@/lib/validations";
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

export interface GeneralInfoFormProps {
  prop: string;
}

export function GeneralInfoForm({ prop }: GeneralInfoFormProps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold">General Info</h2>
        <p className="text-muted-foreground text-sm">
          This will not appear on your resume
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/**Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                </FormControl>
                <FormDescription>
                  This will not appear on your resume. It is only for your
                  reference.
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
