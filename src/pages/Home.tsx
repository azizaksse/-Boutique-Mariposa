import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Phone } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { cn, formatPrice } from '../lib/utils';

export function Home() {
    const { t, language } = useI18n();
    const videoRef = useRef<HTMLVideoElement>(null);

    const featuredProducts = useQuery(api.products.list) || [];
    // Filter featured client-side or add a specific query in Convex
    const featured = featuredProducts.filter(p => p.featured).slice(0, 4);

    const categories = useQuery(api.categories.list) || [];
    const featuredCategories = categories.slice(0, 4);

    const loading = featuredProducts === undefined || categories === undefined;

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.5;
        }
    }, [loading]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.5;
        }
    }, [loading]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1400px] relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-secondary-900">
                    {/* Video Background */}
                    <div className="absolute inset-0 w-full h-full">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                console.error('Video failed to load');
                                e.currentTarget.style.display = 'none';
                            }}
                        >
                            <source src="/vedio bg.mp4" type="video/mp4" />
                        </video>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white mb-8 backdrop-blur-md animate-fade-in">
                                <span className="flex h-2 w-2 rounded-full bg-gold-400 mr-2 animate-pulse"></span>
                                Nouvelle Collection 2025
                            </div>

                            <h1 className={cn("text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8 drop-shadow-lg", language === 'ar' && "font-arabic")}>
                                <span className="block mb-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>{t('hero.title')}</span>
                            </h1>

                            <p className={cn("mx-auto max-w-2xl text-xl text-white/90 mb-12 leading-relaxed drop-shadow-md animate-slide-up", language === 'ar' && "font-arabic")} style={{ animationDelay: '0.2s' }}>
                                {t('hero.subtitle')}
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                <Link to="/categories" className="btn btn-primary text-lg px-8 py-4 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all duration-300 border-none">
                                    {t('hero.cta')}
                                </Link>
                                <Link to="/contact" className="btn bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-md text-lg px-8 py-4 hover:-translate-y-1 transition-all duration-300">
                                    Contactez-nous
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-secondary-200/50 border border-white/50 transition-transform hover:-translate-y-1 duration-300">
                        <div className="h-14 w-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 text-primary-600 shadow-inner">
                            <Truck className="h-7 w-7" />
                        </div>
                        <h3 className="font-bold text-lg text-secondary-900 mb-2">Livraison 48h</h3>
                        <p className="text-secondary-500">Partout en Algérie</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-secondary-200/50 border border-white/50 transition-transform hover:-translate-y-1 duration-300">
                        <div className="h-14 w-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 text-primary-600 shadow-inner">
                            <ShieldCheck className="h-7 w-7" />
                        </div>
                        <h3 className="font-bold text-lg text-secondary-900 mb-2">Paiement à la livraison</h3>
                        <p className="text-secondary-500">Commandez en toute confiance</p>
                    </div>
                    <a href="https://wa.me/213658688543" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-secondary-200/50 border border-white/50 transition-transform hover:-translate-y-1 duration-300 cursor-pointer">
                        <div className="h-14 w-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 text-primary-600 shadow-inner">
                            <Phone className="h-7 w-7" />
                        </div>
                        <h3 className="font-bold text-lg text-secondary-900 mb-2">Support WhatsApp</h3>
                        <p className="text-secondary-500">Disponible 7j/7</p>
                    </a>
                </div>
            </section>

            {/* Featured Categories */}
            {featuredCategories.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                    <h2 className={cn("text-2xl font-bold text-secondary-900 mb-8 text-center", language === 'ar' && "font-arabic")}>
                        {t('categories.title')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {featuredCategories.map((cat) => (
                            <Link key={cat._id} to={`/categories?cat=${cat._id}`} className="group relative overflow-hidden rounded-2xl aspect-square bg-secondary-100">
                                {cat.image ? (
                                    <img src={cat.image} alt={language === 'ar' ? cat.name_ar : cat.name_fr} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-secondary-200 text-secondary-400">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                    <span className={cn("text-white font-medium", language === 'ar' && "font-arabic")}>
                                        {language === 'ar' ? cat.name_ar : cat.name_fr}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Products */}
            {featured.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                    <h2 className={cn("text-2xl font-bold text-secondary-900 mb-8 text-center", language === 'ar' && "font-arabic")}>
                        {t('featured.title')}
                    </h2>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                        {featured.map((product) => (
                            <Link key={product._id} to={`/product/${product._id}`} className="card group shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="aspect-[4/5] overflow-hidden bg-secondary-100 relative">
                                    {product.images?.[0] && (
                                        <img src={product.images[0]} alt={language === 'ar' ? product.name_ar : product.name_fr} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    )}
                                    {product.old_price && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">PROMO</span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className={cn("text-sm font-medium text-secondary-900 line-clamp-2 mb-2", language === 'ar' && "font-arabic")}>
                                        {language === 'ar' ? product.name_ar : product.name_fr}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</span>
                                            {product.old_price && (
                                                <span className="text-xs text-secondary-400 line-through">{formatPrice(product.old_price)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
