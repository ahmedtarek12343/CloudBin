import { useState, useEffect, useCallback, useRef } from "react";
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
import { useQueryClient } from "@tanstack/react-query"; // 👈 Add this

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewFolder = ({ open, onOpenChange }: Props) => {
  const [folderName, setFolderName] = useState<string>("New Folder");
  const [parentFolderPath, setParentFolderPath] = useState<string>("/");
  const fetcher = useFetcher();
  const queryClient = useQueryClient(); // 👈 Add this
  const isLoading = fetcher.state !== "idle";
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!fetcher.data) return;
    if (hasShownToast.current) return;

    if (fetcher.data.ok) {
      hasShownToast.current = true;
      toast.success("Folder created successfully!");

      // 👇 Invalidate the files query to refetch
      queryClient.invalidateQueries({ queryKey: ["files"] });

      onOpenChange(false);
    } else {
      console.log(fetcher.data.error);
      toast.error(fetcher.data.error ?? "Failed to create folder");
    }
  }, [fetcher.data, onOpenChange, queryClient]); // 👈 Add queryClient

  useEffect(() => {
    if (!open) {
      hasShownToast.current = false;
      setFolderName("New Folder");
      setParentFolderPath("/");
    }
  }, [open]);

  const handleSubmit = useCallback(() => {
    hasShownToast.current = false;
    fetcher.submit(
      {
        folderName,
        parentFolderPath,
      },
      { action: "/", method: "post", encType: "application/json" }
    );
  }, [folderName, parentFolderPath, fetcher]);

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
              placeholder="Enter parent folder path"
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
