//we can also put this in individual form files.. but we put it here because we will use it in two places .. also for server verification Client-side (form validation): Server-side (request validation)Type reuse:

import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

//generalInfoForm
export const generalInfoFormSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoFormSchema>;

//personalInfoForm
export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>() //undefined because we dont have to upload photo
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "This is not an image file, please upload a valid image file."
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File size must be less than 4MB"
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  zipCode: optionalString,
  country: optionalString,
  email: optionalString,
  phone: optionalString,
  location: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
