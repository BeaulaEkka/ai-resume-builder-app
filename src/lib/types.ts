//all th forms need the type so we need this type again instead of using the resumeSchema

import { ResumeValues } from "./validations";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export interface LayoutPropTypes {
  resumeData: ResumeValues;
  className?: string;
}
