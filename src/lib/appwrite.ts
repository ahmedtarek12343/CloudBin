import { Client, Account, Databases, Functions } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

export async function getCurrentUserFolder() {
  try {
    const user = await account.get();
    const folderName = user.$id;
    return folderName;
  } catch (err) {
    return null;
  }
}

export { ID, Query, Permission, Role, OAuthProvider } from "appwrite";
