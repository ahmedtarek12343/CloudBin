import { FileCard } from "../../../components/FileCard";
import type { File, FolderCardType } from "@/types/all-types";
import { Link, useLoaderData, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";
import { FolderCard } from "@/components/FolderCard";
import { useEffect } from "react";

export const FolderPreview = () => {
  const { files, folders } = useLoaderData();
  const location = useLocation();
  const pathname = location.pathname.split("/").slice(1);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/home">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathname.map((path: string, i: number) => {
            const accumulatedPath = pathname.slice(0, i + 1).join("/");

            return (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link viewTransition to={`/${accumulatedPath}`}>
                      {path}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i !== pathname.length - 1 && <BreadcrumbSeparator />}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex items-center flex-wrap gap-5 mt-10">
        {folders.map((folder: FolderCardType, i: number) => {
          return <FolderCard folder={folder} key={i} />;
        })}
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {files.length ? (
          <p className="font-bold text-primary">No files yet!</p>
        ) : (
          files.map((file: File, i: number) => <FileCard key={i} file={file} />)
        )}
      </section>
    </>
  );
};
