import type { File } from "@/types/all-types";

export const FileInfo = ({ file }: { file: File }) => {
  return (
    <div className="space-y-2">
      <div>
        <strong>Name:</strong> {file.name}
      </div>
      <div>
        <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
      </div>
      <div>
        <strong>Created:</strong>{" "}
        {new Date(file.createdAt).toLocaleDateString()}
      </div>
      <div>
        <strong>Updated At:</strong>{" "}
        {new Date(file.updatedAt).toLocaleDateString()}
      </div>
      <div>
        <strong>Path:</strong> {file.filePath}
      </div>
      {file.url && (
        <div>
          <strong>URL:</strong>{" "}
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View File
          </a>
        </div>
      )}
    </div>
  );
};
