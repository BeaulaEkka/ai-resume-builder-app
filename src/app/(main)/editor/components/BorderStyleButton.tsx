import { Button } from "@/components/ui/button";
import { Squircle } from "lucide-react";

//define options for border radius
export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

//turn object into array
const borderStyles = Object.values(BorderStyles);
export interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  function handleBorderStyleChange() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;
  return (
    <Button
      variant="outline"
      onClick={handleBorderStyleChange}
      title="Change border Style"
      type="button"
      size="icon"
    >
      <Squircle className="size-6" />
    </Button>
  );
}
