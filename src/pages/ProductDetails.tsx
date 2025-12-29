import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag, ChevronLeft, CheckCircle, User, Phone, MapPin, Building, Navigation, Truck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useI18n } from '../lib/i18n';
import { supabase } from '../lib/supabase';
// import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { wilayas } from '../lib/wilayas';
import { cn, formatPrice } from '../lib/utils';
import { trackViewContent, trackLead } from '../lib/pixel';

const schema = z.object({
    fullName: z.string().min(3, 'Name is too short'),
    phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, 'Invalid phone number'),
    wilaya: z.string().min(1, 'Select a wilaya'),
    commune: z.string().min(1, 'Commune is required'),
    address: z.string().min(5, 'Address is too short'),
    deliveryMethod: z.enum(['home', 'stopdesk']),
    quantity: z.number().min(1),
});

type FormData = z.infer<typeof schema>;

export function ProductDetails() {
    const { id } = useParams();
    const { t, language } = useI18n();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            deliveryMethod: 'home',
            quantity: 1,
        }
    });

    const selectedWilayaCode = watch('wilaya');
    const deliveryMethod = watch('deliveryMethod');
    const quantity = watch('quantity');

    const selectedWilaya = wilayas.find(w => w.code === selectedWilayaCode);
    const deliveryFee = selectedWilaya
        ? (deliveryMethod === 'home' ? selectedWilaya.home_fee : selectedWilaya.stopdesk_fee)
        : 0;

    const total = product ? (product.price * quantity) + deliveryFee : 0;

    useEffect(() => {
        if (!id) return;

        async function loadProduct() {
            const { data } = await supabase.from('products').select('*').eq('id', id).single();
            if (data) {
                setProduct(data);
                trackViewContent(data);
            }
            setLoading(false);
        }
        loadProduct();
    }, [id]);

    const onSubmit = async (data: FormData) => {
        if (!product) return;
        setSubmitting(true);

        const orderData = {
            full_name: data.fullName,
            phone: data.phone,
            wilaya: selectedWilaya?.name_fr || data.wilaya,
            commune: data.commune,
            address: data.address,
            delivery_method: data.deliveryMethod,
            delivery_fee: deliveryFee,
            total: total,
            status: 'new',
            items: [{
                product_id: product.id,
                quantity: data.quantity,
                price: product.price,
                name_fr: product.name_fr,
                name_ar: product.name_ar,
            }],
        };

        const { error } = await supabase.from('orders').insert([orderData]);

        if (error) {
            console.error(error);
            alert('Error submitting order');
            setSubmitting(false);
        } else {
            setSuccess(true);
            trackLead(orderData);
            setSubmitting(false);

            // Format WhatsApp Message
            const msg = `*New Order!* 🛍️%0A%0A` +
                `*Product:* ${language === 'ar' ? product.name_ar : product.name_fr}%0A` +
                `*Price:* ${formatPrice(product.price)}%0A` +
                `*Quantity:* ${data.quantity}%0A` +
                `*Total:* ${formatPrice(total)}%0A` +
                `------------------%0A` +
                `*Name:* ${data.fullName}%0A` +
                `*Phone:* ${data.phone}%0A` +
                `*Address:* ${data.address}%0A` +
                `*City:* ${data.commune}, ${selectedWilaya?.name_fr || data.wilaya}%0A` +
                `*Delivery:* ${data.deliveryMethod === 'home' ? 'Domicile' : 'Stopdesk'}`;

            // Redirect to WhatsApp
            window.open(`https://wa.me/213658688543?text=${msg}`, '_blank');
        }
    };

    if (loading) return <div className="p-12 text-center">Loading...</div>;
    if (!product) return <div className="p-12 text-center">Product not found</div>;



    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pt-24" >
            <Link to="/categories" className="inline-flex items-center text-sm text-secondary-500 hover:text-primary-600 mb-6">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t('nav.categories')}
            </Link>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                {/* Images - Takes up 7 columns on large screens */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="aspect-square overflow-hidden rounded-3xl bg-white shadow-lg border border-secondary-100 relative group">
                        {product.images?.[selectedImage] && (
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name_fr}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )}
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        {product.images?.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={cn(
                                    "relative h-24 w-24 flex-none overflow-hidden rounded-xl border-2 transition-all duration-200",
                                    selectedImage === idx ? "border-primary-600 ring-2 ring-primary-100" : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img src={img} alt="" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Description moved here for better layout balance */}
                    <div className="mt-8">
                        <h1 className={cn("text-3xl font-bold text-secondary-900 mb-4", language === 'ar' && "font-arabic")}>
                            {language === 'ar' ? product.name_ar : product.name_fr}
                        </h1>
                        <div className={cn("prose prose-lg text-secondary-600 leading-relaxed", language === 'ar' && "font-arabic")}>
                            <p>{language === 'ar' ? product.description_ar : product.description_fr}</p>
                        </div>
                    </div>
                </div>

                {/* Form - Takes up 5 columns on large screens */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 bg-white rounded-3xl shadow-xl shadow-secondary-200/50 border border-secondary-100 overflow-hidden">
                        {success ? (
                            <div className="p-8 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 animate-bounce">
                                    <CheckCircle className="h-10 w-10" />
                                </div>
                                <h2 className="text-2xl font-bold text-secondary-900 mb-4">{t('checkout.success')}</h2>
                                <p className="text-secondary-600 mb-8">
                                    Merci pour votre commande. Nous vous contacterons bientôt pour confirmer.
                                </p>
                                <button onClick={() => setSuccess(false)} className="btn btn-primary w-full">
                                    Commander à nouveau
                                </button>
                            </div>
                        ) : (
                            <div className="p-6">
                                <h3 className={cn("text-xl font-bold text-center mb-6", language === 'ar' && "font-arabic")}>
                                    {t('checkout.title')}
                                </h3>

                                {/* Order Summary Card */}
                                <div className="bg-secondary-50 rounded-xl p-4 mb-6 border border-secondary-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-secondary-600 flex items-center gap-2"><ShoppingBag className="h-4 w-4" /> {t('product.price')}</span>
                                        <span className="font-bold text-lg">{formatPrice(product.price * quantity)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-secondary-600 flex items-center gap-2"><Truck className="h-4 w-4" /> {t('checkout.delivery')}</span>
                                        <span className="font-medium">{deliveryFee === 0 ? '...' : formatPrice(deliveryFee)}</span>
                                    </div>
                                    <div className="border-t border-secondary-200 my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-secondary-900 flex items-center gap-2"><Building className="h-4 w-4" /> {t('checkout.total')}</span>
                                        <span className="font-extrabold text-xl text-primary-600">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <input {...register('fullName')} className="input pl-10" placeholder={t('checkout.form.name')} />
                                    </div>
                                    {errors.fullName && <span className="text-xs text-red-500 block mt-1">{errors.fullName.message}</span>}

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <input {...register('phone')} className="input pl-10" placeholder={t('checkout.form.phone')} />
                                    </div>
                                    {errors.phone && <span className="text-xs text-red-500 block mt-1">{errors.phone.message}</span>}

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <select {...register('wilaya')} className="input pl-10 appearance-none">
                                                <option value="">Wilaya</option>
                                                {wilayas.map(w => (
                                                    <option key={w.code} value={w.code}>
                                                        {w.code} - {language === 'ar' ? w.name_ar : w.name_fr}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400">
                                                <Building className="h-5 w-5" />
                                            </div>
                                            <input {...register('commune')} className="input pl-10" placeholder={t('checkout.form.commune')} />
                                        </div>
                                    </div>
                                    {(errors.wilaya || errors.commune) && <span className="text-xs text-red-500 block mt-1">Location required</span>}

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400">
                                            <Navigation className="h-5 w-5" />
                                        </div>
                                        <input {...register('address')} className="input pl-10" placeholder={t('checkout.form.address')} />
                                    </div>
                                    {errors.address && <span className="text-xs text-red-500 block mt-1">{errors.address.message}</span>}

                                    {/* Delivery Method & Quantity */}
                                    <div className="bg-secondary-50 p-3 rounded-xl border border-secondary-100 space-y-3">
                                        <div className="space-y-3">
                                            <span className="text-sm font-medium text-secondary-700 block">{t('checkout.delivery')}</span>
                                            <div className="grid grid-cols-2 gap-3">
                                                <label className={cn(
                                                    "cursor-pointer flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 relative overflow-hidden",
                                                    deliveryMethod === 'home' ? "bg-white border-primary-500 text-primary-700 shadow-sm" : "bg-white/50 border-transparent text-secondary-500 hover:bg-white hover:border-secondary-200"
                                                )}>
                                                    <input type="radio" value="home" {...register('deliveryMethod')} className="hidden" />
                                                    <span className="relative z-10">Domicile</span>
                                                    {deliveryMethod === 'home' && <div className="absolute inset-0 bg-primary-50/20"></div>}
                                                </label>
                                                <label className={cn(
                                                    "cursor-pointer flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 relative overflow-hidden",
                                                    deliveryMethod === 'stopdesk' ? "bg-white border-primary-500 text-primary-700 shadow-sm" : "bg-white/50 border-transparent text-secondary-500 hover:bg-white hover:border-secondary-200"
                                                )}>
                                                    <input type="radio" value="stopdesk" {...register('deliveryMethod')} className="hidden" />
                                                    <span className="relative z-10">Bureau</span>
                                                    {deliveryMethod === 'stopdesk' && <div className="absolute inset-0 bg-primary-50/20"></div>}
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-secondary-200 pt-4">
                                            <span className="text-sm font-medium text-secondary-700">Quantité</span>
                                            <div className="flex items-center gap-3">
                                                <button type="button" onClick={() => setValue('quantity', Math.max(1, quantity - 1))} className="h-9 w-9 flex items-center justify-center rounded-full bg-white border border-secondary-200 hover:bg-secondary-100 text-lg font-bold shadow-sm transition-colors">-</button>
                                                <span className="font-bold w-6 text-center text-lg">{quantity}</span>
                                                <button type="button" onClick={() => setValue('quantity', quantity + 1)} className="h-9 w-9 flex items-center justify-center rounded-full bg-white border border-secondary-200 hover:bg-secondary-100 text-lg font-bold shadow-sm transition-colors">+</button>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" disabled={submitting} className="btn btn-primary w-full py-4 text-lg shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] border-none">
                                        <MessageCircle className="h-6 w-6" />
                                        {submitting ? 'Traitement...' : t('product.order_whatsapp')}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
