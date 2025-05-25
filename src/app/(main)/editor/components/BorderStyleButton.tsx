import { Button } from "@/components/ui/button";
import { Squircle } from "lucide-react";

export interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  function handleBorderStyleChange() {}
  return (
    <Button
      variant="outline"
      onClick={handleBorderStyleChange}
      title="Change border Style"
      type="button"
      size="icon"
    >
      <Squircle className="size-5" />
    </Button>
  );
}
