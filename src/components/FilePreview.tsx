import { Image, Video } from "@imagekit/react";

import type { FilePreviewType } from "@/types/all-types";

export const FilePreview = ({
  file,
  thumbnail,
  isImage,
  isVideo,
  transformQuery,
  loading,
  setLoading,
}: FilePreviewType) => {
  return (
    <div className="md:flex-1 flex items-center justify-center bg-muted rounded-lg relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 rounded-lg">
          <p className="text-white text-lg font-medium">Processing...</p>
        </div>
      )}
      {isVideo ? (
        <Video
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          file={file}
          src={file.url}
          width={800}
          height={800}
          alt={file.name}
          controls
          className="max-h-[90%] max-w-[95%] rounded-lg"
        />
      ) : (
        <Image
          key={transformQuery}
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          src={`${thumbnail}${isImage ? `&${transformQuery}` : ""}`}
          alt={file.name}
          loading="lazy"
          className="rounded-lg object-contain h-full w-full"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      )}
    </div>
  );
};
