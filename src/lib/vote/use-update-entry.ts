import { api, type Id } from "@/lib/api";
import { useMutation } from "convex/react";

export function useUpdateEntry(id: Id<"entry">) {
  const updateEntryMutation = useMutation(api.entry.update);

  return ({ revealed, title }: { revealed?: boolean; title?: string }) =>
    updateEntryMutation({ entryId: id, update: { revealed, title } });
}
