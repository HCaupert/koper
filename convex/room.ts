import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("room", args);
    const entryId = await ctx.db.insert("entry", {
      revealed: false,
      roomId,
      title: "",
    });
    return { roomId, entryId };
  },
});

export const list = query({
  handler: (ctx) => ctx.db.query("room").order("desc").collect(),
});
