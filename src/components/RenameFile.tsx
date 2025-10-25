import { useState, useEffect, useCallback } from "react";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  filePath: string;
  onSuccess?: () => void;
}

import { useFetcher } from "react-router";
import { Loader2Icon } from "lucide-react";

export const RenameFile = ({
  open,
  onOpenChange,
  fileName,
  filePath,
  onSuccess,
}: Props) => {
  const [fileNewName, setFileNewName] = useState(fileName);
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) setFileNewName(fileName);
  }, [open, fileName]);

  useEffect(() => {
    if (!fetcher.data) return;
    if (fetcher.data.ok) {
      toast.success("File renamed successfully!");
      onOpenChange(false);
      queryClient.refetchQueries({ queryKey: ["files"] });

      onSuccess?.();
    } else {
      toast.error(fetcher.data.error ?? "Failed to rename file");
    }
  }, [onOpenChange, onSuccess, fetcher.data]);

  const handleSubmit = useCallback(() => {
    if (!fileNewName.trim()) {
      toast.error("File name cannot be empty");
      return;
    }

    fetcher.submit(
      { filePath, newName: fileNewName },
      {
        method: "put",
        encType: "application/json",
        action: "/",
      }
    );
  }, [fileNewName, filePath]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>
            Change the name of{" "}
            <strong>
              {fileName.slice(0, 15)}
              {fileName.length > 15 ? "..." : ""}
            </strong>
          </DialogDescription>
        </DialogHeader>
        <Input
          value={fileNewName}
          onChange={(e) => setFileNewName(e.target.value)}
          placeholder="Enter new file name"
          className="mt-4"
        ></Input>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2Icon className="animate-spin mr-2" />}
            {isLoading ? "Saving" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
