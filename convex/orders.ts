import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        full_name: v.string(),
        phone: v.string(),
        wilaya: v.string(),
        commune: v.string(),
        address: v.string(),
        delivery_method: v.string(),
        delivery_fee: v.number(),
        total: v.number(),
        status: v.string(),
        items: v.array(
            v.object({
                product_id: v.string(),
                quantity: v.number(),
                price: v.number(),
                name_fr: v.string(),
                name_ar: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const orderId = await ctx.db.insert("orders", {
            ...args,
            // created_at is automatically handled by Convex creation time (_creationTime)
        });
        return orderId;
    },
});

export const getOrdersByDate = query({
    args: {
        from: v.optional(v.number()),
        to: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        let orders;

        if (args.from && args.to) {
            orders = await ctx.db
                .query("orders")
                .filter((q) =>
                    q.and(
                        q.gte(q.field("_creationTime"), args.from!),
                        q.lte(q.field("_creationTime"), args.to!)
                    )
                )
                .collect();
        } else {
            orders = await ctx.db.query("orders").collect();
        }

        // Sort by creation time descending (newest first)
        orders.sort((a, b) => b._creationTime - a._creationTime);

        return orders;
    },
});

export const getDashboardStats = query({
    args: {
        from: v.optional(v.number()),
        to: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        let orders;
        if (args.from && args.to) {
            orders = await ctx.db
                .query("orders")
                .filter((q) =>
                    q.and(
                        q.gte(q.field("_creationTime"), args.from!),
                        q.lte(q.field("_creationTime"), args.to!)
                    )
                )
                .collect();
        } else {
            orders = await ctx.db.query("orders").collect();
        }

        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const totalOrders = orders.length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return {
            totalRevenue,
            totalOrders,
            averageOrderValue
        };
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("orders"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});

export const updateOrder = mutation({
    args: {
        id: v.id("orders"),
        updates: v.object({
            full_name: v.optional(v.string()),
            phone: v.optional(v.string()),
            wilaya: v.optional(v.string()),
            commune: v.optional(v.string()),
            address: v.optional(v.string()),
            delivery_method: v.optional(v.string()),
            delivery_fee: v.optional(v.number()),
            total: v.optional(v.number()),
            status: v.optional(v.string()),
        }),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.get(args.id);
        if (!existing) {
            throw new Error("Order not found");
        }
        await ctx.db.patch(args.id, args.updates);
    },
});

export const deleteOrder = mutation({
    args: {
        id: v.id("orders"),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.get(args.id);
        if (!existing) {
            throw new Error("Order not found");
        }
        await ctx.db.delete(args.id);
    },
});

export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        const dummyOrders = [
            {
                full_name: "Ahmed Benali",
                phone: "0550123456",
                wilaya: "Alger",
                commune: "Bab Ezzouar",
                address: "Cité 5 Juillet, Apt 12",
                delivery_method: "home",
                delivery_fee: 500,
                total: 5000,
                status: "new",
                items: [
                    {
                        product_id: "dummy_id_1",
                        quantity: 1,
                        price: 4500,
                        name_fr: "Coffret Cadeau Prestige",
                        name_ar: "علبة هدايا فاخرة",
                    }
                ]
            },
            {
                full_name: "Sarah Bouzid",
                phone: "0661987654",
                wilaya: "Oran",
                commune: "Es Senia",
                address: "Rue 1er Novembre",
                delivery_method: "desk",
                delivery_fee: 300,
                total: 3800,
                status: "confirmed",
                items: [
                    {
                        product_id: "dummy_id_2",
                        quantity: 1,
                        price: 3500,
                        name_fr: "Montre Classique",
                        name_ar: "ساعة كلاسيكية",
                    }
                ]
            },
            {
                full_name: "Karim Saadi",
                phone: "0770555555",
                wilaya: "Constantine",
                commune: "El Khroub",
                address: "Lotissement Zouaghi",
                delivery_method: "home",
                delivery_fee: 600,
                total: 12000,
                status: "delivered",
                items: [
                    {
                        product_id: "dummy_id_3",
                        quantity: 2,
                        price: 5700,
                        name_fr: "Parfum Floral",
                        name_ar: "عطر زهري",
                    }
                ]
            },
            {
                full_name: "Amine Khelil",
                phone: "0540112233",
                wilaya: "Setif",
                commune: "Setif",
                address: "Ain El Fouara",
                delivery_method: "home",
                delivery_fee: 500,
                total: 2500,
                status: "cancelled",
                items: [
                    {
                        product_id: "dummy_id_4",
                        quantity: 1,
                        price: 2000,
                        name_fr: "Bracelet Orné",
                        name_ar: "سوار مزخرف",
                    }
                ]
            }
        ];

        for (const order of dummyOrders) {
            await ctx.db.insert("orders", order);
        }
    },
});
