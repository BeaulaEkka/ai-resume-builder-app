import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver } from "dns";
import React from "react";
import { useForm } from "react-hook-form";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
  });
  return <div>skills</div>;
}
