import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import type { Entry, Vote } from "@/lib/vote/types";
import { cn } from "@/lib/utils";
import { useUpdateEntry } from "@/lib/vote/use-update-entry";

export function VotesSection({
  entry: { revealed, votes, _id },
}: {
  entry: Entry;
}) {
  const updateEntry = useUpdateEntry(_id);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-3 gap-20">
        {votes.map((vote) => (
          <Vote vote={vote} key={vote._id} />
        ))}
      </div>
      <Button
        variant="secondary"
        onClick={() => updateEntry({ revealed: !revealed })}
      >
        {revealed ? (
          <>
            Hide <EyeOffIcon />
          </>
        ) : (
          <>
            Reveal <EyeIcon />
          </>
        )}
      </Button>
    </div>
  );
}

export function Vote({ vote: { value, _id, userName } }: { vote: Vote }) {
  const hidden = value === undefined;

  return (
    <div key={_id} className={cn("flex flex-col items-center gap-2")}>
      <div
        className={cn(
          "bg-primary/50 flex h-24 w-16 items-center justify-center rounded text-3xl font-medium transition-all transform-3d",
          hidden && "rotate-y-180",
          !hidden && "duration-1000",
        )}
      >
        <div className="bg-card flex h-full w-full items-center justify-center rounded border backface-hidden">
          {value}
        </div>
      </div>
      {userName}
    </div>
  );
}
