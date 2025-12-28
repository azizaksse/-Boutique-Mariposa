export interface Product {
    id: string;
    created_at: string;
    name_fr: string;
    name_ar: string;
    slug: string;
    description_fr: string;
    description_ar: string;
    price: number;
    old_price?: number;
    images: string[];
    category_id: string;
    stock: number;
    featured: boolean;
}

export interface Category {
    id: string;
    created_at: string;
    name_fr: string;
    name_ar: string;
    slug: string;
    image?: string;
}

export interface Order {
    id: string;
    created_at: string;
    full_name: string;
    phone: string;
    wilaya: string;
    commune: string;
    address: string;
    delivery_method: 'home' | 'stopdesk';
    delivery_fee: number;
    total: number;
    status: 'new' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
    items: OrderItem[];
    notes?: string;
}

export interface OrderItem {
    product_id: string;
    quantity: number;
    price: number;
    name_fr: string;
    name_ar: string;
}

export interface Wilaya {
    code: string;
    name_fr: string;
    name_ar: string;
    home_fee: number;
    stopdesk_fee: number;
}
