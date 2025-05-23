import { LayoutPropTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";

export default function DefaultLayout({
  resumeData,
  className,
}: LayoutPropTypes) {
  return (
    <div
      className={cn("aspect-[210/297] w-full bg-white text-black", className)}
    >
      <div>
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

import { ResumeValues } from "@/lib/validations";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    firstName,
    lastName,
    jobTitle,
    photo,
    email,
    phone,
    city,
    country,
    zipCode,
    colorHex,
    borderStyle,
  } = resumeData;

  //photot is string
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  //convert file into string
  useEffect(() => {
    const objectUrl =
      photo instanceof File ? URL.createObjectURL(photo) : photo;
    if (objectUrl) {
      setPhotoSrc(objectUrl);
      if (photo === null) {
        setPhotoSrc(""); //to remove the preview
        return () => URL.revokeObjectURL(objectUrl);
      }
    }
  }, [photo]);

  return (
    <div className="flex">
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          {photoSrc && (
            <Image
              src={photoSrc}
              alt="profile image"
              width={110}
              height={110}
              className="aspect-square object-cover"
            />
          )}
        </div>
        <div>
          <div
            className="flex gap-2 text-3xl font-bold uppercase"
            style={{ color: colorHex }}
          >
            <h1>{firstName}</h1>
            <h1>{lastName}</h1>
          </div>

          <p className="text-lg">{jobTitle}</p>
          <div className="text-sm text-gray-400">
            <div className="flex gap-2">
              <p>{city}</p>
              {city && zipCode ? " | " : ""}
              <p>{zipCode}</p>
              {zipCode && country ? " | " : ""}
              <p>{country}</p>
            </div>
            <div className="flex pt-1">
              {[phone, email].filter(Boolean).join(" | ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  const color = colorHex || "#000"; // fallback to black

  return (
    <>
      <hr className="border-2" style={{ borderColor: color }} />
      <div className="break-inside-avoid space-y-3">
        <h1 className="pt-2 text-xl font-bold" style={{ color: colorHex }}>
          Professional Profile
        </h1>
      </div>
      <p className="pb-3 text-sm whitespace-pre-line">{summary}</p>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;
  if (!workExperiences) return null;

  //only show exp that is not empty
  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp): exp is NonNullable<typeof exp> =>
      exp !== undefined && Object.values(exp).filter(Boolean).length > 0,
  );
  if (!workExperiencesNotEmpty?.length) return null;
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="pt-3 text-xl font-bold" style={{ color: colorHex }}>
          Work Experiences
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex flex-col justify-between text-sm">
              <div className="flex justify-between pt-3">
                <p className="text-lg font-bold">{exp?.company}</p>{" "}
                <div className="flex gap-2">
                  {exp.startDate && (
                    <span>
                      {formatDate(exp.startDate, "MMM yy")} -{" "}
                      {exp.endDate
                        ? formatDate(exp.endDate, "MMM yy")
                        : "present"}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-400">{exp?.position}</p>
              <p className="py-3">{exp?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  if (!educations) return null;

  //only show exp that is not empty
  const educationsNotEmpty = educations?.filter(
    (edu): edu is NonNullable<typeof edu> =>
      edu !== undefined && Object.values(edu).filter(Boolean).length > 0,
  );
  if (!educationsNotEmpty?.length) return null;
  return (
    <>
      <div>
        <hr className="border-2" style={{ borderColor: colorHex }} />
        <div className="space-y-3">
          <p className="pt-3 text-xl font-bold" style={{ color: colorHex }}>
            Education
          </p>

          {educationsNotEmpty?.map((edu, index) => (
            <div key={index} className="py-3">
              <div className="flex justify-between">
                <h1 className="text-md font-bold">{edu?.degree}</h1>
                <div className="flex gap-2">
                  {edu.startDate && (
                    <span className="text-sm text-gray-400">
                      {formatDate(edu.startDate, "MMM yy")} -{" "}
                      {edu.endDate
                        ? formatDate(edu.endDate, "MMM yy")
                        : "present"}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-500 text-sm">{edu?.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex } = resumeData;
  if (!skills) return null;

  //only show exp that is not empty
  const skillsNotEmpty = skills?.filter(
    (skill): skill is NonNullable<typeof skill> =>
      skill !== undefined && Object.values(skill).filter(Boolean).length > 0,
  );
  if (!skillsNotEmpty?.length) return null;

  return (
    <div>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-xl font-bold pt-3" style={{ color: colorHex }}>
          Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {skillsNotEmpty?.map((skill, index) => (
            <p key={index} className="pt-3">
              <Badge
                className="rounded-md bg-gray-950 px-2 py-1 text-xs font-semibold text-white hover:bg-black"
                style={{ backgroundColor: colorHex }}
              >
                {skill}
              </Badge>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
