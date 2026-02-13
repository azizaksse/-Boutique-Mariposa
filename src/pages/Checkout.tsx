import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useI18n } from '../lib/i18n';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { wilayas } from '../lib/wilayas';
import { cn, formatPrice } from '../lib/utils';
import { CheckCircle } from 'lucide-react';
import { trackLead } from '../lib/pixel';
import { LocationSelector } from '../components/LocationSelector';

const schema = z.object({
    fullName: z.string().min(3, 'Name is too short'),
    phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, 'Invalid phone number'),
    wilaya: z.string().min(1, 'Select a wilaya'),
    commune: z.string().min(1, 'Commune is required'),
    address: z.string().min(5, 'Address is too short'),
    deliveryMethod: z.enum(['home', 'stopdesk']),
    quantity: z.number().min(1),
    notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function Checkout() {
    const { id } = useParams();
    const productId = id as Id<"products">;
    const { t, language } = useI18n();

    const product = useQuery(api.products.get, { id: productId });
    const createOrder = useMutation(api.orders.create);

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
                product_id: product._id,
                quantity: data.quantity,
                price: product.price,
                name_fr: product.name_fr,
                name_ar: product.name_ar,
            }],
        };

        try {
            await createOrder(orderData);
            setSuccess(true);
            trackLead(orderData);
        } catch (error) {
            console.error(error);
            alert('Error submitting order');
        } finally {
            setSubmitting(false);
        }
    };

    if (product === undefined) return <div className="p-12 text-center">Loading...</div>;
    if (product === null) return <div className="p-12 text-center">Product not found</div>;

    if (success) {
        return (
            <div className="mx-auto max-w-md px-4 py-16 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">{t('checkout.success')}</h2>
                <p className="text-secondary-600 mb-8">
                    Merci pour votre commande. Nous vous contacterons bientôt pour confirmer.
                </p>
                <Link to="/" className="btn btn-primary">
                    {t('nav.home')}
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <h1 className={cn("text-3xl font-bold text-secondary-900 mb-8 text-center", language === 'ar' && "font-arabic")}>
                {t('checkout.title')}
            </h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Form */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-secondary-200/50 border border-white/50 backdrop-blur-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="label text-secondary-700 font-medium mb-2 block">{t('checkout.form.name')}</label>
                                <input {...register('fullName')} className="input w-full px-4 py-3 rounded-xl border-secondary-200 focus:border-primary-500 focus:ring-primary-500 bg-secondary-50/50" placeholder="Nom & Prénom" />
                                {errors.fullName && <span className="text-xs text-red-500 mt-1 block">{errors.fullName.message}</span>}
                            </div>

                            <div>
                                <label className="label text-secondary-700 font-medium mb-2 block">{t('checkout.form.phone')}</label>
                                <input {...register('phone')} className="input w-full px-4 py-3 rounded-xl border-secondary-200 focus:border-primary-500 focus:ring-primary-500 bg-secondary-50/50" placeholder="05XXXXXXXX" />
                                {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>}
                            </div>
                        </div>

                        {/* Location Selector - NEW 69 Wilayas Support */}
                        <LocationSelector
                            defaultWilaya={watch('wilaya')}
                            defaultCommune={watch('commune')}
                            onSelect={(location) => {
                                // Extract wilaya code from "code - name" format
                                const wilayaCode = location.wilaya.split(' - ')[0];
                                setValue('wilaya', wilayaCode);
                                setValue('commune', location.commune);
                            }}
                        />
                        {(errors.wilaya || errors.commune) && (
                            <span className="text-xs text-red-500 mt-1 block">
                                {errors.wilaya?.message || errors.commune?.message}
                            </span>
                        )}

                        <div>
                            <label className="label text-secondary-700 font-medium mb-2 block">{t('checkout.form.address')}</label>
                            <textarea {...register('address')} className="input w-full px-4 py-3 rounded-xl border-secondary-200 focus:border-primary-500 focus:ring-primary-500 bg-secondary-50/50" rows={2} placeholder="Adresse de livraison" />
                            {errors.address && <span className="text-xs text-red-500 mt-1 block">{errors.address.message}</span>}
                        </div>

                        <div>
                            <label className="label text-secondary-700 font-medium mb-3 block">{t('checkout.delivery')}</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={cn(
                                    "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                                    deliveryMethod === 'home' ? "border-primary-500 bg-primary-50/30" : "border-secondary-100 hover:border-primary-200"
                                )}>
                                    <input type="radio" value="home" {...register('deliveryMethod')} className="text-primary-600 focus:ring-primary-500" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-secondary-900">À Domicile</span>
                                        <span className="text-xs text-secondary-500">Livraison jusqu'à chez vous</span>
                                    </div>
                                </label>
                                <label className={cn(
                                    "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                                    deliveryMethod === 'stopdesk' ? "border-primary-500 bg-primary-50/30" : "border-secondary-100 hover:border-primary-200"
                                )}>
                                    <input type="radio" value="stopdesk" {...register('deliveryMethod')} className="text-primary-600 focus:ring-primary-500" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-secondary-900">Bureau (Stop Desk)</span>
                                        <span className="text-xs text-secondary-500">Récupérer au bureau de livraison</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="label text-secondary-700 font-medium mb-3 block">Quantité</label>
                            <div className="flex items-center gap-4 bg-secondary-50 w-fit p-1 rounded-xl border border-secondary-200">
                                <button type="button" onClick={() => setValue('quantity', Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-secondary-100 text-secondary-600 transition-colors font-bold text-lg">-</button>
                                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                                <button type="button" onClick={() => setValue('quantity', quantity + 1)} className="h-10 w-10 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-secondary-100 text-secondary-600 transition-colors font-bold text-lg">+</button>
                            </div>
                        </div>

                        <button type="submit" disabled={submitting} className="btn btn-primary w-full py-4 text-lg shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transform hover:-translate-y-1 transition-all duration-300 mt-4">
                            {submitting ? 'Traitement en cours...' : t('checkout.form.submit')}
                        </button>
                    </form>
                </div>

                {/* Summary */}
                <div className="lg:sticky lg:top-32 h-fit">
                    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-secondary-200/50 border border-white/50 backdrop-blur-sm">
                        <h2 className="text-xl font-bold mb-6 text-secondary-900 border-b border-secondary-100 pb-4">{t('checkout.summary')}</h2>
                        <div className="flex gap-4 mb-6">
                            <div className="h-24 w-24 bg-secondary-100 rounded-xl overflow-hidden border border-secondary-200 flex-none">
                                {product.images?.[0] && <img src={product.images[0]} className="h-full w-full object-cover" />}
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className={cn("font-bold text-lg text-secondary-900 leading-tight mb-1", language === 'ar' && "font-arabic")}>
                                    {language === 'ar' ? product.name_ar : product.name_fr}
                                </h3>
                                <p className="text-primary-600 font-extrabold text-xl">{formatPrice(product.price)}</p>
                                <p className="text-sm text-secondary-500 mt-1 bg-secondary-50 px-2 py-0.5 rounded-md w-fit">Qté: {quantity}</p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-secondary-100">
                            <div className="flex justify-between text-secondary-600">
                                <span>Sous-total</span>
                                <span className="font-medium">{formatPrice(product.price * quantity)}</span>
                            </div>
                            <div className="flex justify-between text-secondary-600">
                                <span>{t('checkout.delivery')}</span>
                                <span className="font-medium text-green-600">{deliveryFee === 0 ? 'Gratuit' : formatPrice(deliveryFee)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-4 border-t border-secondary-100 text-secondary-900 mt-2">
                                <span>{t('checkout.total')}</span>
                                <span className="text-primary-600">{formatPrice(total)}</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-primary-50 rounded-xl p-4 text-sm text-primary-800 border border-primary-100">
                            <p className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 flex-none" />
                                Paiement à la livraison (Cash on Delivery)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
