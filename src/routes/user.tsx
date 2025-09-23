import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { H1 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useSetUser } from "@/lib/use-user";

export const Route = createFileRoute("/user")({
  component: UserRoute,
  validateSearch: z.object({
    returnTo: z.string().optional(),
  }),
});

function UserRoute() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [_, setUser] = useSetUser();
  const { returnTo } = Route.useSearch();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUser({ name: name, id: crypto.randomUUID() });
    return navigate({
      to: returnTo ?? "/",
    });
  };

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-6">
      <H1>What's your name</H1>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex w-96 max-w-[80%] flex-col gap-2"
      >
        <Input
          id="name"
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" size="lg">
          Let's get started!
        </Button>
      </form>
    </main>
  );
}
