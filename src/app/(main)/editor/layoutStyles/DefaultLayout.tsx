import { LayoutPropTypes } from "@/lib/types";
import { cn } from "@/lib/utils";

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
        <SummaryInfo resumeData={resumeData} />
      </div>
    </div>
  );
}

import { ResumeValues } from "@/lib/validations";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    <div className="flex border">
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
          <div className="flex gap-2 border text-3xl font-bold uppercase">
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
            <div className="flex">
              {[phone, email].filter(Boolean).join(" | ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryInfo({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;
  if (!summary) return null;

  return (
    <>
      <hr className="border-2" />
      <h1 className="text-2xl font-bold">Summary</h1>
      <p>{summary}</p>
    </>
  );
}
