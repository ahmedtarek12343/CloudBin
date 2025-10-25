import { useEffect, useCallback } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import type { DeleteFileType } from "@/types/all-types";

export const DeleteFile = ({
  open,
  onOpenChange,
  fileId,
  fileUrl,
}: DeleteFileType) => {
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success("File deleted successfully!");
    } else {
      toast.error(fetcher.data.error || "Failed to delete file.");
      queryClient.invalidateQueries({ queryKey: ["files"] });
    }
  }, [fetcher.data, queryClient]);

  const handleSubmit = useCallback(() => {
    if (!fileId?.trim()) {
      toast.error("File not found");
      return;
    }

    queryClient.setQueryData(["files"], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        files: oldData.files?.filter((f: any) => f.fileId !== fileId) || [],
        recentFiles:
          oldData.recentFiles?.filter((f: any) => f.fileId !== fileId) || [],
      };
    });


    onOpenChange(false);

    fetcher.submit(
      { fileId, fileUrl },
      {
        method: "delete",
        encType: "application/json",
        action: "/",
      }
    );
  }, [fileId, fileUrl, fetcher, queryClient, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this file? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
