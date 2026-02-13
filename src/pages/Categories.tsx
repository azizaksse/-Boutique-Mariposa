import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
// import { supabase } from '../lib/supabase';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { cn, formatPrice } from '../lib/utils';

export function Categories() {
    const { language } = useI18n();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('cat');

    const categories = useQuery(api.categories.list);
    const products = useQuery(api.products.list);

    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        if (products) {
            if (categoryId) {
                setFilteredProducts(products.filter((p: any) => p.category === categoryId));
            } else {
                setFilteredProducts(products);
            }
        }
    }, [categoryId, products]);

    if (!categories || !products) return <div>Loading...</div>;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            {/* Categories Bar */}
            <div className="flex overflow-x-auto gap-3 pb-8 no-scrollbar mask-linear-fade">
                <Link
                    to="/categories"
                    className={cn(
                        "flex-none px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm",
                        !categoryId
                            ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-primary-500/30"
                            : "bg-white text-secondary-600 border border-secondary-200 hover:border-primary-300 hover:text-primary-600"
                    )}
                >
                    All
                </Link>
                {categories.map((cat: any) => (
                    <Link
                        key={cat._id}
                        to={`/categories?cat=${cat._id}`}
                        className={cn(
                            "flex-none px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm",
                            categoryId === cat._id
                                ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-primary-500/30"
                                : "bg-white text-secondary-600 border border-secondary-200 hover:border-primary-300 hover:text-primary-600"
                        )}
                    >
                        {language === 'ar' ? cat.name_ar : cat.name_fr}
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`} className="card group shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="aspect-[4/5] overflow-hidden bg-secondary-100 relative">
                            {product.images?.[0] && (
                                <img src={product.images[0]} alt={language === 'ar' ? product.name_ar : product.name_fr} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className={cn("text-sm font-medium text-secondary-900 line-clamp-2 mb-2", language === 'ar' && "font-arabic")}>
                                {language === 'ar' ? product.name_ar : product.name_fr}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-secondary-500">
                    No products found.
                </div>
            )}
        </div>
    );
}
