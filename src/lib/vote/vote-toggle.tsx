import { useMutation } from "convex/react";
import { api, type Id } from "@/lib/api";
import type { Vote } from "@/lib/vote/types.ts";
import { useUser } from "@/lib/use-user";
import { Toggle } from "@/components/ui/toggle";

export function VoteToggles({
  entryId,
  currentVote,
}: {
  entryId: Id<"entry">;
  currentVote: Vote | undefined;
}) {
  return (
    <div className="max-w-full">
      <h3 className="text-muted-foreground mb-2 text-center text-2xl font-medium">
        Pick your points
      </h3>
      <div className="flex gap-4 overflow-y-auto">
        {voteValues.map((v) => (
          <VoteToggle
            key={v}
            entryId={entryId}
            value={v}
            currentVote={currentVote}
          />
        ))}
      </div>
    </div>
  );
}

function VoteToggle({
  entryId,
  value,
  currentVote,
}: {
  entryId: Id<"entry">;
  value: string | number;
  currentVote: Vote | undefined;
}) {
  const vote = useVote(entryId);

  return (
    <Toggle
      className="flex size-16 shrink-0 items-center justify-center text-3xl"
      pressed={currentVote?.value == value}
      onPressedChange={(pressed) => pressed && vote(value)}
    >
      {value}
    </Toggle>
  );
}

function useVote(entryId: Id<"entry">) {
  const [user] = useUser();
  const mutate = useMutation(api.entry.vote);

  return (value: number | string) =>
    mutate({
      entryId,
      value: "" + value,
      userId: user.id,
      userName: user.name,
    });
}

export const voteValues = [
  "-",
  0,
  1,
  2,
  3,
  5,
  8,
  13,
  21,
  34,
  55,
  89,
  144,
  "∞",
  "☕",
] as const;
