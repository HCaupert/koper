import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { partial } from "convex-helpers/validators";

export const list = query({
  args: { roomId: v.id("room") },
  handler: (ctx, args) =>
    ctx.db
      .query("entry")
      .withIndex("room_id", (q) => q.eq("roomId", args.roomId))
      .order("desc")
      .collect(),
});

export const get = query({
  args: {
    roomId: v.id("room"),
    entryId: v.optional(v.id("entry")),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const entry = args.entryId
      ? await ctx.db.get(args.entryId)
      : await ctx.db.query("entry").order("desc").first();

    if (!entry) throw Error("Entry not found");

    const votes = await ctx.db
      .query("vote")
      .withIndex("by_entry", (q) => q.eq("entryId", entry._id))
      .collect();

    const room = await ctx.db.get(entry.roomId);
    if (!room) throw Error("Entry not found");

    return {
      ...entry,
      votes: votes.map((v) => ({
        ...v,
        value: entry.revealed || v.userId == args.userId ? v.value : undefined,
      })),
      room,
    };
  },
});

export const update = mutation({
  args: {
    entryId: v.id("entry"),
    update: partial(
      v.object({
        revealed: v.optional(v.boolean()),
        title: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.entryId, args.update);
  },
});

export const create = mutation({
  args: { title: v.string(), roomId: v.id("room") },
  handler: async (ctx, args) =>
    await ctx.db.insert("entry", { ...args, revealed: false }),
});

export const vote = mutation({
  args: {
    entryId: v.id("entry"),
    value: v.string(),
    userId: v.string(),
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const currentVote = await ctx.db
      .query("vote")
      .withIndex("by_entry_user", (q) =>
        q.eq("entryId", args.entryId).eq("userId", args.userId),
      )
      .first();

    if (currentVote) {
      return ctx.db.replace(currentVote._id, args);
    }

    return ctx.db.insert("vote", args);
  },
});
