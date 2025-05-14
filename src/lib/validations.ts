//we can also put this in individual form files.. but we put it here because we will use it in two places .. also for server verification

import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

//generalInfoForm
export const generalInfoForm = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoForm>;
