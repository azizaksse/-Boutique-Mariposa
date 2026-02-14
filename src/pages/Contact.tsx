import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { cn } from '../lib/utils';

export function Contact() {
    const { t, language } = useI18n();
    const { register, handleSubmit, reset } = useForm();
    const sendMessage = useMutation(api.messages.send);

    const onSubmit = async (data: any) => {
        await sendMessage(data);
        alert('Message sent!');
        reset();
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <h1 className={cn("text-3xl font-bold text-center mb-12", language === 'ar' && "font-arabic")}>
                {t('nav.contact')}
            </h1>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary-50 p-3 text-primary-600">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Phone</h3>
                            <p className="text-secondary-600">0542 51 15 54</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary-50 p-3 text-primary-600">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p className="text-secondary-600">medamine.261190@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary-50 p-3 text-primary-600">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Location</h3>
                            <p className="text-secondary-600">حي 05 جويلية, Sidi Aïssa, Algeria</p>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <a href="#" className="btn btn-secondary rounded-full p-3">
                            <Instagram className="h-6 w-6" />
                        </a>
                        <a href="#" className="btn btn-secondary rounded-full p-3">
                            <Facebook className="h-6 w-6" />
                        </a>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label">Name</label>
                            <input {...register('name')} className="input" required />
                        </div>
                        <div>
                            <label className="label">Phone</label>
                            <input {...register('phone')} className="input" required />
                        </div>
                        <div>
                            <label className="label">Message</label>
                            <textarea {...register('message')} className="input" rows={4} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
