import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { H2 } from "@/components/typography";
import { EntryTitle } from "@/lib/vote/entry-title";
import { VotesSection } from "@/lib/vote/votes-section";
import { VoteToggles } from "@/lib/vote/vote-toggle";
import { useGetEntry } from "@/lib/vote/user-get-entry";
import { useMutation, useQuery } from "convex/react";
import { api, type Id } from "@/lib/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const Route = createFileRoute("/$roomId/{-$entryId}")({
  component: EntryId,
});

function EntryId() {
  const { entryId, roomId } = Route.useParams();
  const entry = useGetEntry({ roomId, entryId });
  if (!entry) return null;

  return (
    <main className="flex w-full max-w-full flex-col gap-10 *:p-4 lg:grid lg:grid-cols-5 lg:*:not-first:p-10">
      <div className="hidden lg:block" />
      <div className="flex max-h-dvh min-h-dvh flex-col items-start justify-between lg:col-span-3">
        <div className="w-full">
          <Link
            to="/$roomId/{-$entryId}"
            params={{ roomId, entryId: undefined }}
          >
            <H2 className="text-muted-foreground text-left">
              {entry.room.name}
            </H2>
          </Link>
          <EntryTitle
            key={entry._id}
            entryId={entry._id}
            entryTitle={entry.title}
          />
        </div>

        <VotesSection entry={entry} />

        <VoteToggles entryId={entry._id} currentVote={entry.currentVote} />
      </div>
      <Entries roomId={entry.roomId} />
    </main>
  );
}

function Entries({ roomId }: { roomId: Id<"room"> }) {
  const entries = useQuery(api.entry.list, { roomId });
  const createEntryMutation = useMutation(api.entry.create);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <Button
        size="lg"
        variant="secondary"
        className="h-16"
        onClick={async () => {
          await createEntryMutation({ roomId, title: "" });
          return navigate({
            to: "/$roomId/{-$entryId}",
            params: { roomId, entryId: undefined },
          });
        }}
      >
        <PlusIcon />
        New
      </Button>
      {entries?.map((entry) => (
        <Link
          to="/$roomId/{-$entryId}"
          key={entry._id}
          params={{ roomId, entryId: entry._id }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
