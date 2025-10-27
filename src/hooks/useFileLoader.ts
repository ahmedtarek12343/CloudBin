import axios from "axios";
import { getCurrentUserFolder } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import type { FolderCardType } from "@/types/all-types";

const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);

const getFiles = async (path: string, isRecent?: boolean) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: { Accept: "application/json", Authorization: `Basic ${API_KEY}` },
    params: {
      path: path || "",
      sort: isRecent ? "DESC_CREATED" : "ASC_CREATED",
    },
  };
  const { data } = await axios.request(option);
  return data;
};

const getFolders = async (path: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: { Accept: "application/json", Authorization: `Basic ${API_KEY}` },
    params: { path: path || "", type: "folder" },
  };
  const { data } = await axios.request(option);
  return data;
};

// 💡 Dynamic hook
export const useFileLoader = (folderPath?: string) => {
  return useQuery({
    queryKey: ["files", folderPath],
    queryFn: async () => {
      const baseFolder = await getCurrentUserFolder();
      const fullPath = folderPath ? `${baseFolder}/${folderPath}` : baseFolder;

      let [files, recentFiles, folders] = await Promise.all([
        getFiles(fullPath!),
        getFiles(fullPath!, true),
        getFolders(fullPath!),
      ]);

      folders = folders.filter(
        (folder: FolderCardType) => folder.name !== "home"
      );

      return { files, recentFiles, folders };
    },
  });
};
