import { Link } from "react-router";
import type { FolderCardType } from "@/types/all-types";
import { FolderIcon } from "lucide-react";
import { getCurrentUserFolder } from "@/lib/appwrite";
import { useEffect, useState } from "react";

export const FolderCard = ({ folder }: { folder: FolderCardType }) => {
  const [userFolderId, setUserFolderId] = useState<string | null>(null);

  useEffect(() => {
    getCurrentUserFolder().then((id) => setUserFolderId(id));
  }, []);

  if (!userFolderId) return <div>Loading...</div>; 

  const path = folder.folderPath;
  const folderPath = path.split(`/${userFolderId}/`)[1]; 

  return (
    <Link
      className="flex gap-2 capitalize border bg-muted p-4 min-w-[300px] mb-5 rounded-lg cursor-pointer"
      to={`/${folderPath}`}
    >
      <FolderIcon /> {folder?.name}
    </Link>
  );
};
