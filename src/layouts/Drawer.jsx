import { WindIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function DrawerComponent() {
  return (
    <div className="visible md:invisible flex flex-row justify-between p-4">
      <span className="text-lg font-appName font-semibold flex flex-row">
        quickWhisper <WindIcon />
      </span>
      <ModeToggle />
    </div>
  );
}
