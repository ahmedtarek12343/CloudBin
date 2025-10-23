import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

import type { File } from "@/types/all-types";
import { FileInfo } from "./FileInfo";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File;
}

export const FileInformation = ({ open, onOpenChange, file }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>File Information</SheetTitle>
          <SheetDescription>
            Detail about <strong>{file.name}</strong>
          </SheetDescription>
        </SheetHeader>
        <div className="px-5">
          <FileInfo file={file} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
