import type { Id } from "@/lib/api";
import { useUpdateEntry } from "@/lib/vote/use-update-entry";

export function EntryTitle({
  entryId,
  entryTitle,
}: {
  entryId: Id<"entry">;
  entryTitle: string;
}) {
  const updateEntry = useUpdateEntry(entryId);

  return (
    <input
      autoFocus
      placeholder="Subject"
      className="w-full max-w-full scroll-m-20 rounded px-3 py-1 pb-2 text-4xl font-extrabold tracking-tight text-balance"
      value={entryTitle}
      onChange={(e) => updateEntry({ title: e.target.value })}
    />
  );
}
