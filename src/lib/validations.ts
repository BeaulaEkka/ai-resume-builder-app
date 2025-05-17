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

//workExperienceForm
export const workExperienceSchema = z.object({
  workExperiences: z.array(
    z
      .object({
        company: optionalString,
        position: optionalString,
        startDate: optionalString, //date inputfield contains string will be later converted to datein the server
        endDate: optionalString,
        description: optionalString,
      })
      .optional()
  ),
});
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

//educationForm
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        institution: optionalString,
        degree: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      })
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

//skillsForm
export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});
export type SkillsValues = z.infer<typeof skillsSchema>;

//resumeSchema its a combination of all the schemas flattened with shape
export const resumeSchema = z.object({
  ...generalInfoFormSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

//but it clashes with the photo in the personalInfoSchema so we need to omit it
export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null; //null because if deleted we send null
};

//in a new resume id needs to be optional /but in edit resume it needs to be required
//when we upload a photo to backend it becomes a url and thats why needs to be a string
