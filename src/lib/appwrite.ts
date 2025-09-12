import { Client, Account, ID } from "appwrite";

const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT as string;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID as string;

if (!appwriteEndpoint || !appwriteProjectId) {
  // Fail fast to make misconfiguration obvious during development
  // eslint-disable-next-line no-console
  console.warn(
    "Missing Appwrite env vars. Ensure VITE_APPWRITE_ENDPOINT and VITE_APPWRITE_PROJECT_ID are set."
  );
}

export const client = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId);

export const account = new Account(client);
export { ID };
