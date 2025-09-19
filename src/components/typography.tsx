import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function H1({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 rounded px-3 py-1 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}
