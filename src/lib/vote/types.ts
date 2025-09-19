import { api } from "@/lib/api";

export type Entry = typeof api.entry.get._returnType;
export type Votes = Entry["votes"];
export type Vote = Votes[number];
