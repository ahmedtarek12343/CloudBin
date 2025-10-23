import axios from "axios";
import type { AxiosRequestConfig } from "axios";
const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);
export const createFolder = async (data: any) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "https://api.imagekit.io/v1/folder",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
    data: {
      folderName: data.folderName,
      parentFolderPath: `${data?.currentFolderName ?? ""}${
        data?.parentFolderPath ? `/${data.parentFolderPath}` : "/"
      }`,
    },
  };

  try {
    await axios.request(options);
    return { ok: true, message: "Folder created successfully" };
  } catch (err) {
    return { ok: false, error: err };
  }
};
