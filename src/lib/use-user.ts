import { useLocalStorage } from "@uidotdev/usehooks";

type StoredUser = { id: string; name: string };

export function useUser() {
  return useLocalStorage<StoredUser>("user", { id: "Hugo", name: "Hugo" });
}
