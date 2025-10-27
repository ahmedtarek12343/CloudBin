import { Link } from "react-router";
import type { FolderCardType } from "@/types/all-types";
import { FolderIcon } from "lucide-react";

export const FolderCard = ({ folder }: { folder: FolderCardType }) => {
  const path = folder.folderPath;
  const folderPath = path.split("/68f8edece9273ab2f344/")[1];

  return (
    <Link
      className="flex gap-2 capitalize border bg-muted p-4 min-w-[300px] mb-5 rounded-lg cursor-pointer"
      to={`/${folderPath}`}
    >
      <FolderIcon /> {folder?.name}
    </Link>
  );
};
