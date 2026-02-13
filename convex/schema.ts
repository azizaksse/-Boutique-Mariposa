import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    orders: defineTable({
        full_name: v.string(),
        phone: v.string(),
        wilaya: v.string(),
        commune: v.string(),
        address: v.string(),
        delivery_method: v.string(),
        delivery_fee: v.number(),
        total: v.number(),
        status: v.string(), // 'new', 'confirmed', 'shipped', 'delivered', 'cancelled'
        items: v.array(
            v.object({
                product_id: v.string(), // Keeping as string to avoid strict ID issues if products are deleted, or can use v.id("products")
                quantity: v.number(),
                price: v.number(),
                name_fr: v.string(),
                name_ar: v.string(),
            })
        ),
    }),
    products: defineTable({
        name_fr: v.string(),
        name_ar: v.string(),
        description_fr: v.string(),
        description_ar: v.string(),
        price: v.number(),
        old_price: v.optional(v.number()), // Added optional field
        images: v.array(v.string()), // Array of image URLs
        category: v.string(),
        stock: v.number(),
        active: v.boolean(),
        featured: v.optional(v.boolean()), // Added optional field
    }),
    categories: defineTable({
        name_fr: v.string(),
        name_ar: v.string(),
        slug: v.string(),
        image: v.optional(v.string()),
    }),
    messages: defineTable({
        name: v.string(),
        phone: v.string(),
        message: v.string(),
    }),
});
