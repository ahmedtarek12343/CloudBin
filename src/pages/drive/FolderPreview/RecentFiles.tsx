import { FileCard } from "../../../components/FileCard";

import { useFileLoader } from "@/hooks/useFileLoader";
import type { File } from "@/types/all-types";

export const RecentFiles = () => {
  const { data } = useFileLoader();
  return (
    <>
      <h1 className="text-2xl font-medium">Recent Files</h1>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data?.recentFiles.map((file: File, i: number) => (
          <FileCard key={i} file={file} />
        ))}
      </section>
    </>
  );
};
