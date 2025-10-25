import { Link } from "react-router";

import type { FolderCardType } from "@/types/all-types";

import { FolderIcon } from "lucide-react";

export const FolderCard = ({ folder }: { folder: FolderCardType }) => {
  const path = folder.folderPath;
  const folderPath = path.substring(path.lastIndexOf("/") + 1);

  return (
    <Link
      className="flex gap-2 capitalize border bg-muted p-4 rounded-lg cursor-pointer"
      to={`/${folderPath}`}
    >
      <FolderIcon /> {folder?.name}
    </Link>
  );
};
