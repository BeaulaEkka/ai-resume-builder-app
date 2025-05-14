import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalInfoFormSchema, GeneralInfoValues } from "@/lib/validations";
import { Form } from "@/components/ui/form";

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
        <form className="space-y-3"></form>
      </Form>
    </div>
  );
}
