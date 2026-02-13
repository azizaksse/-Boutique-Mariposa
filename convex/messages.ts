import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
    args: {
        name: v.string(),
        phone: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("messages", args);
    },
});
