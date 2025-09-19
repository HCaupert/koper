import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    title: v.string(),
    imageId: v.string(),
    price: v.number(),
  }),
  room: defineTable({
    name: v.string(),
  }),
  entry: defineTable({
    roomId: v.id("room"),
    title: v.string(),
    revealed: v.boolean(),
  }).index("room_id", ["roomId"]),
  vote: defineTable({
    entryId: v.id("entry"),
    value: v.string(),
    userId: v.string(),
    userName: v.string(),
  })
    .index("by_entry", ["entryId"])
    .index("by_entry_user", ["entryId", "userId"]),
});
