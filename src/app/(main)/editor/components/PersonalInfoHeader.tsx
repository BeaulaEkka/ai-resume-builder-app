import { ResumeValues } from "@/lib/validations";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
export default function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
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
    <div className="flex flex-col gap-2">
      {photoSrc && (
        <Image
          src={photoSrc}
          alt="profile image"
          width={250}
          height={250}
          className="aspect-square object-cover"
        />
      )}

      <h1 className="text-3xl font-bold">{firstName}</h1>
      <h1 className="text-3xl font-bold">{lastName}</h1>
      <p className="text-lg">{jobTitle}</p>
      <p>{city}</p>
      <p>{zipCode}</p>
      <p>{country}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  );
}
