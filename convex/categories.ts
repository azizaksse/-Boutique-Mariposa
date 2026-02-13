import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        const categories = await ctx.db.query("categories").collect();

        // Convert storage IDs to URLs
        return await Promise.all(
            categories.map(async (category) => {
                let imageUrl = category.image;

                // If image exists and looks like a storage ID (not a URL), convert it
                if (imageUrl && !imageUrl.startsWith("http")) {
                    try {
                        imageUrl = (await ctx.storage.getUrl(imageUrl as any)) ?? undefined;
                    } catch (error) {
                        console.error("Failed to get image URL for category:", category._id, error);
                        imageUrl = undefined;
                    }
                }

                return {
                    ...category,
                    image: imageUrl || undefined,
                };
            })
        );
    },
});

export const create = mutation({
    args: {
        name_fr: v.string(),
        name_ar: v.string(),
        slug: v.string(),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("categories", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("categories"),
        name_fr: v.string(),
        name_ar: v.string(),
        slug: v.string(),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...rest } = args;
        await ctx.db.patch(id, rest);
    },
});

export const remove = mutation({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
