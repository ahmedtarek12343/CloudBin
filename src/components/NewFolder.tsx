import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Loader2Icon } from "lucide-react";
import { useFetcher } from "react-router";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewFolder = ({ open, onOpenChange }: Props) => {
  const [folderName, setFolderName] = useState<string>("New Folder");
  const [parentFolderPath, setParentFolderPath] = useState<string>("/");
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success("Folder created successfully!");
      onOpenChange(false);
    } else {
      console.log(fetcher.data.error);
      toast.error(fetcher.data.error ?? "Failed to create folder");
    }
  }, [fetcher.data, onOpenChange]);

  const handleSubmit = useCallback(() => {
    fetcher.submit(
      {
        folderName,
        parentFolderPath,
      },
      { action: "/drive", method: "post", encType: "application/json" }
    );
  }, [folderName, parentFolderPath]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folderName">
              Folder name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={folderName}
              id="folderName"
              onChange={(e) => {
                setFolderName(e.currentTarget.value);
              }}
              required
              placeholder="Enter new folder name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ParentFolderPath">
              Parent Folder Path <span className="text-red-500">*</span>
            </Label>
            <Input
              value={parentFolderPath}
              id="ParentFolderPath"
              onChange={(e) => {
                setParentFolderPath(e.currentTarget.value);
              }}
              required
              placeholder="Enter new folder name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              onOpenChange(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Loader2Icon className="animate-spin" /> : null}
            {isLoading ? "Creating..." : "Create Folder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
