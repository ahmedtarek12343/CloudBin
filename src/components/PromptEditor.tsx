import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import type { PromptEditorType } from "@/types/all-types";

export const PromptEditor = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onApply,
}: PromptEditorType) => {
  return (
    <div className="space-y-4">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <Button
        size="sm"
        variant="outline"
        className="mt-3 w-full"
        onClick={onApply}
        disabled={!value.trim()}
      >
        Apply Changes
      </Button>
    </div>
  );
};
