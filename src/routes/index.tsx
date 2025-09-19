import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/lib/api.ts";
import { H1 } from "@/components/typography.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const createRoom = useMutation(api.room.create);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { roomId } = await createRoom({ name });
    return navigate({
      to: "/$roomId/{-$entryId}",
      params: { roomId },
    });
  };

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-6">
      <H1>What are we planning today?</H1>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex w-96 max-w-[80%] flex-col gap-2"
      >
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" size="lg">
          Plan!
        </Button>
      </form>
    </main>
  );
}
