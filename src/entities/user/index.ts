export type AppUser = {
  id: string;
  name: string | null;
  email: string | null;
};

export function mapAccountUser(user: any): AppUser {
  return {
    id: user?.$id ?? "",
    name: user?.name ?? null,
    email: (user && (user.email ?? user.providerEmail)) ?? null,
  };
}
