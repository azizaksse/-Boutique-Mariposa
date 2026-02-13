import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        const product = await ctx.db.get(args.id);
        if (!product) return null;

        if (product.images) {
            product.images = await Promise.all(
                product.images.map(async (img) => {
                    if (!img) return null;
                    if (img.startsWith("http") || img.startsWith("/")) return img;
                    try {
                        const url = await ctx.storage.getUrl(img as any);
                        return url;
                    } catch (e) {
                        console.error("Failed to resolve image URL for ID:", img, e);
                        return null;
                    }
                })
            ) as any; // Cast to avoid TS error with filtered nulls if strict, though here we return array including nulls

            // Filter out nulls to clean up the array for the frontend
            product.images = product.images.filter(Boolean) as string[];
        }
        return product;
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db.query("products").order("desc").collect();
        return await Promise.all(
            products.map(async (product) => {
                if (product.images) {
                    const resolvedImages = await Promise.all(
                        product.images.map(async (img) => {
                            if (!img) return null;
                            if (img.startsWith("http") || img.startsWith("/")) return img;
                            try {
                                const url = await ctx.storage.getUrl(img as any);
                                return url;
                            } catch (e) {
                                console.error("Failed to resolve image URL for ID:", img, e);
                                return null;
                            }
                        })
                    );
                    // Filter out nulls
                    product.images = resolvedImages.filter((img): img is string => typeof img === 'string');
                }
                return product;
            })
        );
    },
});

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const create = mutation({
    args: {
        name_fr: v.string(),
        name_ar: v.string(),
        description_fr: v.optional(v.string()),
        description_ar: v.optional(v.string()),
        price: v.number(),
        old_price: v.optional(v.number()),
        category: v.string(),
        images: v.array(v.string()),
        stock: v.number(),
        active: v.boolean(),
        featured: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const productData = {
            ...args,
            description_fr: args.description_fr || "",
            description_ar: args.description_ar || "",
            featured: args.featured || false,
        };
        return await ctx.db.insert("products", productData);
    },
});

export const update = mutation({
    args: {
        id: v.id("products"),
        name_fr: v.optional(v.string()),
        name_ar: v.optional(v.string()),
        price: v.optional(v.number()),
        old_price: v.optional(v.number()),
        category: v.optional(v.string()),
        images: v.optional(v.array(v.string())),
        stock: v.optional(v.number()),
        active: v.optional(v.boolean()),
        featured: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...rest } = args;
        await ctx.db.patch(id, rest);
    },
});

export const remove = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        const products = [
            {
                name_fr: 'Coffret Cadeau Prestige',
                name_ar: 'علبة هدايا فاخرة',
                description_fr: 'Un magnifique coffret cadeau pour toutes les occasions.',
                description_ar: 'علبة هدايا رائعة لجميع المناسبات.',
                price: 4500,
                category: 'coffrets-cadeaux',
                images: ['/products/577065491_1392773052858755_8581221638271002659_n.jpg', '/products/593622443_1394290112707049_5521390838049995874_n.jpg'],
                stock: 10,
                active: true,
            },
            {
                name_fr: 'Coffret Élégance',
                name_ar: 'علبة الأناقة',
                description_fr: 'Ensemble élégant et raffiné.',
                description_ar: 'مجموعة أنيقة وراقية.',
                price: 3800,
                category: 'coffrets-cadeaux',
                images: ['/products/594151784_1398143662321694_8994175036544004615_n.jpg'],
                stock: 15,
                active: true,
            },
            {
                name_fr: 'Pack Surprise',
                name_ar: 'حزمة المفاجأة',
                description_fr: 'Le cadeau parfait pour surprendre vos proches.',
                description_ar: 'الهدية المثالية لمفاجأة أحبائك.',
                price: 2900,
                category: 'coffrets-cadeaux',
                images: ['/products/594411656_1395149802621080_6975751905709291921_n.jpg'],
                stock: 20,
                active: false,
            },
            {
                name_fr: 'Coffret Luxe',
                name_ar: 'علبة فاخرة',
                description_fr: 'Coffret haut de gamme.',
                description_ar: 'علبة من الطراز الرفيع.',
                price: 5200,
                category: 'coffrets-cadeaux',
                images: ['/products/594999489_1395149792621081_946846984272299866_n.jpg'],
                stock: 5,
                active: true,
            },
            {
                name_fr: 'Montre Classique',
                name_ar: 'ساعة كلاسيكية',
                description_fr: 'Montre au design intemporel.',
                description_ar: 'ساعة بتصميم خالد.',
                price: 3500,
                category: 'montres-accessoires',
                images: ['/products/594067945_1395149809287746_3105109334085061566_n.jpg'],
                stock: 12,
                active: true,
            },
            {
                name_fr: 'Ensemble Accessoires',
                name_ar: 'طقم إكسسوارات',
                description_fr: 'Ensemble complet pour un look parfait.',
                description_ar: 'طقم كامل لمظهر مثالي.',
                price: 2500,
                category: 'montres-accessoires',
                images: ['/products/595660919_1395149795954414_7418656366095910303_n.jpg'],
                stock: 18,
                active: false,
            },
            {
                name_fr: 'Montre Sport',
                name_ar: 'ساعة رياضية',
                description_fr: 'Pour un style décontracté et sportif.',
                description_ar: 'لأسلوب غير رسمي ورياضي.',
                price: 2800,
                category: 'montres-accessoires',
                images: ['/products/596042821_1397461199056607_4428601718205048649_n.jpg'],
                stock: 10,
                active: false,
            },
            {
                name_fr: 'Bracelet Orné',
                name_ar: 'سوار مزخرف',
                description_fr: 'Bracelet délicat et brillant.',
                description_ar: 'سوار رقيق ولامع.',
                price: 1500,
                category: 'montres-accessoires',
                images: ['/products/597226231_1401622121973848_1108481544322113140_n.jpg'],
                stock: 25,
                active: false,
            },
            {
                name_fr: 'Parfum Floral',
                name_ar: 'عطر زهري',
                description_fr: 'Une fragrance douce et fleurie.',
                description_ar: 'عطر ناعم وزهري.',
                price: 4200,
                category: 'parfums',
                images: ['/products/595690264_1395797702556290_7934707841311875150_n.jpg'],
                stock: 8,
                active: true,
            },
            {
                name_fr: 'Coffret Parfum',
                name_ar: 'علبة عطر',
                description_fr: 'Le cadeau idéal pour elle.',
                description_ar: 'الهدية المثالية لها.',
                price: 5500,
                category: 'parfums',
                images: ['/products/597367001_1403751178427609_4164190190203869139_n.jpg'],
                stock: 6,
                active: true,
            },
            {
                name_fr: 'Essence Pure',
                name_ar: 'جوهر خالص',
                description_fr: 'Un parfum intense et durable.',
                description_ar: 'عطر قوي ويدوم طويلاً.',
                price: 3900,
                category: 'parfums',
                images: ['/products/597689344_1403751125094281_2515371019614509854_n.jpg'],
                stock: 15,
                active: false,
            },
        ];

        for (const product of products) {
            await ctx.db.insert("products", product);
        }
    },
});
