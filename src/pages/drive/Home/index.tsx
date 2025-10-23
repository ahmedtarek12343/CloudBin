import { useFileLoader } from "@/hooks/useFileLoader";
import { Button } from "@/components/ui/button";
import { Files, RefreshCwIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { FolderCard } from "@/components/FolderCard";
import type { FolderCardType } from "@/types/all-types";
import { Skeleton } from "@/components/ui/skeleton";
import { FileCard } from "@/components/FileCard";
import type { File } from "@/types/all-types";
const Home = () => {
  const { data, refetch, isRefetching, isLoading } = useFileLoader();
  console.log(data?.files);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Welcome to CloudBin</h1>
        <Button
          onClick={() => refetch()}
          disabled={isRefetching}
          variant="outline"
          size="sm"
        >
          <RefreshCwIcon className={isRefetching ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      <div className="space-y-6 mt-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer">
            Suggested Folders <ChevronDownIcon />
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden transition-all duration-300">
            {isLoading && (
              <div className="space-y-2 mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Skeleton className="h-8 w-[350px]" />
                <Skeleton className="h-8 w-[350px]" />
                <Skeleton className="h-8 w-[350px]" />
                <Skeleton className="h-8 w-[350px]" />
              </div>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
              {data?.folder.map((folder: FolderCardType, i: number) =>
                isRefetching ? (
                  <div className="space-y-2 mt-5">
                    <Skeleton className="h-8 w-[350px]" />
                  </div>
                ) : (
                  <FolderCard key={i} folder={folder} />
                )
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer">
            Suggested Files ({data?.files.length}) <ChevronDownIcon />
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden transition-all duration-300">
            {isLoading && (
              <div className="space-y-2 mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Skeleton className="h-8 w-[350px]" />
                <Skeleton className="h-8 w-[350px]" />
                <Skeleton className="h-8 w-[350px]" />
                <Skeleton className="h-8 w-[350px]" />
              </div>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
              {data?.files.map((file: File, i: number) =>
                isRefetching ? (
                  <div className="space-y-2 mt-5">
                    <Skeleton className="h-8 w-[350px]" />
                  </div>
                ) : (
                  <FileCard key={i} file={file} />
                )
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default Home;
