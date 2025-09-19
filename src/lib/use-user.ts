import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "@tanstack/react-router";

type StoredUser = { id: string; name: string };

export function useSetUser() {
  return useLocalStorage<StoredUser>("user");
}

export function useUser() {
  const navigate = useNavigate();
  const [user] = useLocalStorage<StoredUser>("user");
  if (!user)
    void navigate({
      to: "/user",
      search: { returnTo: window.location.pathname },
    });
  return user;
}
