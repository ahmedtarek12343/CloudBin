import { FileCard } from "../../../components/FileCard";
import type { File } from "@/types/all-types";
import { Link, useLoaderData, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";

export const FolderPreview = () => {
  const files = useLoaderData();
  const location = useLocation();
  const pathname = location.pathname.split("/").slice(1);
  console.log(pathname);

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
          {pathname.map((path: string, i: number) => (
            <>
              <BreadcrumbItem key={i}>
                <BreadcrumbLink asChild>
                  <Link to={`/${path}`}>{path}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {i !== pathname.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {files.map((file: File, i: number) => (
          <FileCard key={i} file={file} />
        ))}
      </section>
    </>
  );
};
