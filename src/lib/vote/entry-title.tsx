import type { Id } from "@/lib/api";
import { useUpdateEntry } from "@/lib/vote/use-update-entry";
import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export function EntryTitle({
  entryId,
  entryTitle,
}: {
  entryId: Id<"entry">;
  entryTitle: string;
}) {
  const [localTitle, setLocalTitle] = useState(entryTitle);
  const updateEntry = useUpdateEntry(entryId);
  const debouncedTitle = useDebounce(localTitle, 500)

  useEffect(() => {
    if (debouncedTitle !== entryTitle) {
      updateEntry({ title: debouncedTitle });
    }
  }, [debouncedTitle]);

  return (
    <input
      autoFocus
      placeholder="Subject"
      className="w-full max-w-full scroll-m-20 rounded px-3 py-1 pb-2 text-4xl font-extrabold tracking-tight text-balance"
      value={localTitle}
      onChange={(e) => setLocalTitle(e.target.value)}
    />
  );
}
