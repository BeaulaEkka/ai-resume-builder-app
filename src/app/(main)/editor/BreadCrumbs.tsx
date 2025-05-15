import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "./steps";
import React from "react";

export interface BreadCrumbsProps {
  //this will come from the url
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export function BreadCrumbs({ currentStep, setCurrentStep }: BreadCrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <BreadcrumbItem>
              {step.key === currentStep ? (
                <BreadcrumbPage>{step.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.key)}
                  >
                    {step.title}
                  </button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < steps.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
