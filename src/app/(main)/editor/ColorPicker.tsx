import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}
export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  //   const [color, setColor] = useState("#aabbcc");

  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="Change resume color"
          onClick={() => setShowPopover(!showPopover)}
          className="rounded-md border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Pick a color"
        >
          <PaletteIcon className="size-5" />{" "}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4" sideOffset={5}>
        <HexColorPicker color={color} onChange={onChange} />
        <p className="mt-2 text-sm text-gray-700">Selected color: {color}</p>
      </PopoverContent>
    </Popover>
  );
}
