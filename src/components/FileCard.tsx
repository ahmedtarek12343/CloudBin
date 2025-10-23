import { useCallback, useState } from "react";
import { Image } from "@imagekit/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";

import { FileMenu } from "./FileMenu";

import { useMemo } from "react";
import { formatCustomDate } from "@/lib/utils";

import { fileIcons } from "../../public/assets/icons/file";

import type { File } from "@/types/all-types";
import { FileDetails } from "./FileDetails";

export const FileCard = ({ file }: { file: File }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const thumbnail = useMemo(
    () => (file?.mime.startsWith("image/") ? file?.url : file?.thumbnail),
    [file]
  );

  const getFileIcon = useCallback((mime: string) => {
    if (!mime) return fileIcons.default;

    if (mime.startsWith("image/")) return fileIcons.image;
    if (mime.startsWith("video/")) return fileIcons.video;

    return fileIcons[mime] || fileIcons.default;
  }, []);

  const Icon = getFileIcon(file.mime);

  return (
    <>
      <Card onDoubleClick={() => setDetailOpen(true)}>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span className="flex gap-2">
              {Icon && <Icon />}
              <span className="mt-1">
                {file.name.slice(0, 16)}
                {file.name.length > 18 ? "..." : ""}
              </span>
            </span>
            <FileMenu file={file} />
          </CardTitle>
        </CardHeader>
        <CardContent className="grow cursor-pointer">
          <Image
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            src={thumbnail}
            width={500}
            height={500}
            alt={file.name}
            loading="lazy"
            className="w-full h-full object-cover rounded-lg"
          />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Last Updated:{" "}
            {file.updatedAt ? formatCustomDate(file.updatedAt) : "N/A"}
          </p>
        </CardFooter>
      </Card>{" "}
      <FileDetails
        open={detailOpen}
        onOpenChange={setDetailOpen}
        file={file}
      ></FileDetails>
    </>
  );
};
