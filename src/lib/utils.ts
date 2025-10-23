import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { formatRelative, isSameYear, format } from "date-fns";
import { toast } from "sonner";

export const toTitleCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};
export function formatCustomDate(date: string | number | Date) {
  const today = new Date();
  const realtiveDay = toTitleCase(formatRelative(date, today).split(" at ")[0]);
  const relativeDays = [
    "Today",
    "Tomorrow",
    "Yesterday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  if (relativeDays.includes(realtiveDay)) {
    return realtiveDay;
  }

  if (isSameYear(date, today)) {
    return format(date, "dd MMM");
  } else {
    return format(date, "dd MMM yyyy");
  }
}

export const downloadFile = async (url: string, fileName?: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok)
      throw new Error(`Failed to download file: ${response.statusText}`);

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName || url.split("/").pop() || "file";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.error("Download Failed!", err);
  }
};

export const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    toast.info("Copied to clipboard");
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};
