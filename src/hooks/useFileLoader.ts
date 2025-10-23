import axios from "axios";

import { getCurrentUserFolder } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";

const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);

const getFiles = async (folderName: string, isRecent?: boolean) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: { Accept: "application/json", Authorization: `Basic ${API_KEY}` },
    params: {
      path: folderName || "",
      sort: isRecent ? "DESC_CREATED" : "ASC_CREATED",
    },
  };
  try {
    const { data } = await axios.request(option);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getFolders = async (folderName: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
    params: {
      path: folderName || "",
      type: "folder",
    },
  };

  try {
    const { data } = await axios.request(option);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const useFileLoader = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const folderName = await getCurrentUserFolder();
      const files = await getFiles(folderName!);
      const recentFiles = await getFiles(folderName!, true);
      const folder = await getFolders(folderName!);

      return { files, recentFiles, folder };
    },
  });
};
