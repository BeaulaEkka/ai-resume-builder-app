import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker() {
  const [color, setColor] = useState("#aabbcc");

  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <button
          className="rounded-md border border-gray-300 bg-white p-2 hover:bg-gray-100"
          aria-label="Pick a color"
        >
          <PaletteIcon className="size-5" />{" "}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" sideOffset={5}>
        <HexColorPicker color={color} onChange={setColor} />
        <p className="mt-2 text-sm text-gray-700">Selected color: {color}</p>
      </PopoverContent>
    </Popover>
  );
}
