import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";

import { RenameFile } from "./RenameFile";
import { FileInformation } from "./FileInformation";
import { DeleteFile } from "./DeleteFile";
import { FileDetails } from "./FileDetails";
import {
  CopyIcon,
  DownloadIcon,
  EditIcon,
  EllipsisVerticalIcon,
  FolderOpenIcon,
  InfoIcon,
  ShareIcon,
  Trash2Icon,
} from "lucide-react";

import { copyToClipboard } from "@/lib/utils";
import type { File } from "@/types/all-types";
import { downloadFile } from "@/lib/utils";

export const FileMenu = ({ file }: { file: File }) => {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-40 w-[200px]">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setDetailsOpen(true)}
          >
            <FolderOpenIcon />
            Open File
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => downloadFile(file.url, file.name)}
          >
            <DownloadIcon />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setRenameOpen(true)}
          >
            <EditIcon />
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />{" "}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ShareIcon />
              Share
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={async () => await copyToClipboard(file.url)}
                >
                  <CopyIcon />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setInfoOpen(true)}
          >
            <InfoIcon />
            Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RenameFile
        open={renameOpen}
        onOpenChange={setRenameOpen}
        fileName={file.name}
        filePath={file.filePath}
      />

      <FileInformation open={infoOpen} onOpenChange={setInfoOpen} file={file} />

      <DeleteFile
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        fileId={file.fileId}
        fileUrl={file.url}
      />

      <FileDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        file={file}
      />
    </>
  );
};
