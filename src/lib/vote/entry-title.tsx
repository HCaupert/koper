import type { Id } from "@/lib/api";
import { useUpdateEntry } from "@/lib/vote/use-update-entry";
import { useState, useRef, useEffect } from "react";

export function EntryTitle({
  entryId,
  entryTitle,
}: {
  entryId: Id<"entry">;
  entryTitle: string;
}) {
  const updateEntry = useUpdateEntry(entryId);
  const [localTitle, setLocalTitle] = useDebouncedServerSync(
    entryTitle,
    (title) => updateEntry({ title }),
  );

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

export function useDebouncedServerSync<T>(
  incomingValue: T,
  onSubmit: (value: T) => Promise<any>,
  delay = 1000,
) {
  const [localValue, setLocalValue] = useState<T>(incomingValue);
  const timeout = useRef<number>(undefined);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!isDirty) {
      setLocalValue(incomingValue);
    }
  }, [incomingValue, isDirty]);

  const set = (value: T) => {
    setLocalValue(value);
    setIsDirty(true)
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      await onSubmit(value);
      setIsDirty(false);
    }, delay);
  };

  return [localValue, set] as const;
}
