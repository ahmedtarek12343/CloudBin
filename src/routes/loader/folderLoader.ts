import { redirect } from "react-router";
import axios from "axios";

import type { LoaderFunction, LoaderFunctionArgs } from "react-router";
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

export const driveFolderLoader: LoaderFunction = async ({ params }) => {
  try {
    const folderName = params.folderName;
    if (!folderName) {
      throw new Error("Folder name is required");
    }

    const files = await getFilesByFolder(folderName);
    return files;
  } catch (err) {
    if (err instanceof AppwriteException) {
      return redirect("/auth/login");
    }

    throw err;
  }
};
