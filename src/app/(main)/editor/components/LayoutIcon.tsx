// components/LayoutIcon.tsx
import { Check } from "lucide-react"; // or any icon library

interface LayoutIconProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function LayoutIcon({
  label,
  selected,
  onClick,
}: LayoutIconProps) {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-muted relative rounded-md border p-2 text-sm ${
        selected ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }`}
    >
      {label}
      {selected && (
        <Check className="absolute top-1 right-1 h-4 w-4 text-blue-600" />
      )}
    </button>
  );
}
