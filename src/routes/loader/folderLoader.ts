import { redirect } from "react-router";
import axios from "axios";

import type { LoaderFunction } from "react-router";
import type { AxiosRequestConfig } from "axios";
import { AppwriteException } from "appwrite";
import { getCurrentUserFolder } from "@/lib/appwrite";
const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);
const getFilesByFolder = async (path: string) => {
  const folderName = await getCurrentUserFolder();

  const options: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    params: {
      path: `${folderName}/${path}`,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
  };
  try {
    const { data } = await axios.request(options);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getFoldersByPath = async (path: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: { Accept: "application/json", Authorization: `Basic ${API_KEY}` },
    params: { path: path || "", type: "folder" },
  };
  const { data } = await axios.request(option);

  return data;
};

export const driveFolderLoader: LoaderFunction = async ({ params }) => {
  try {
    const folderParent = await getCurrentUserFolder();
    const folderName = params.folderName
      ? params.folderName + (params["*"] ? `/${params["*"]}` : "")
      : params["*"] || "";
    console.log(params["*"]);

    if (!folderName) {
      throw new Error("Folder name is required");
    }

    const files = await getFilesByFolder(folderName);
    const folders = await getFoldersByPath(`/${folderParent}/${folderName}`);

    return { files, folders };
  } catch (err) {
    if (err instanceof AppwriteException) {
      return redirect("/auth/login");
    }

    throw err;
  }
};
