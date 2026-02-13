import { mutation } from "./_generated/server";

export const orders = mutation({
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
