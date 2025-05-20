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
    <div className="border-border-green-500 flex flex-col gap-2">
      {photoSrc && (
        <div className="h-50 w-50">
          <Image
            src={photoSrc}
            alt="profile image"
            width={50}
            height={50}
            className="aspect-square object-cover"
          />
        </div>
      )}
      <div className="flex gap-2 text-3xl font-bold">
        <h1>{firstName}</h1>
        <h1>{lastName}</h1>
      </div>

      <p className="text-lg">{jobTitle}</p>
      <p>{city}</p>
      <p>{zipCode}</p>
      <p>{country}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  );
}
