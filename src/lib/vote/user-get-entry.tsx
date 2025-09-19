import { useUser } from "@/lib/use-user";
import { useQuery } from "convex/react";
import { api, type Id } from "@/lib/api";

export function useGetEntry({
  roomId,
  entryId,
}: {
  roomId: string;
  entryId?: string;
}) {
  const [user] = useUser();

  const entry = useQuery(api.entry.get, {
    entryId: entryId as Id<"entry">,
    roomId: roomId as Id<"room">,
    userId: user.id,
  });

  const currentVote = entry?.votes.find((v) => v.userId === user.id);

  return entry ? { ...entry, currentVote } : undefined;
}
