"use client";

import { Client, Account, ID } from "appwrite";

const endpoint =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const projectId =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

let cachedClient: Client | null = null;
let cachedAccount: Account | null = null;

function ensureClient(): Client {
  if (cachedClient) return cachedClient;

  if (!endpoint || !projectId) {
    // eslint-disable-next-line no-console
    console.warn(
      "Missing Appwrite env vars. Provide NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID."
    );
  }

  cachedClient = new Client()
    .setEndpoint(endpoint as string)
    .setProject(projectId as string);
  return cachedClient;
}

export function getAccount(): Account {
  if (cachedAccount) return cachedAccount;
  const client = ensureClient();
  cachedAccount = new Account(client);
  return cachedAccount;
}

export { ID };
