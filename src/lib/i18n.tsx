import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'ar';

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    fr: {
        'nav.home': 'Accueil',
        'nav.categories': 'Catégories',
        'nav.contact': 'Contact',
        'hero.title': 'Boutique Mariposa',
        'hero.subtitle': 'Découvrez notre collection exclusive de cadeaux et accessoires pour sublimer chaque instant.',
        'hero.cta': 'Explorer la Collection',
        'featured.title': 'Produits Vedettes',
        'categories.title': 'Nos Catégories',
        'product.price': 'Prix',
        'product.order': 'Commander',
        'product.order_whatsapp': 'Commander sur WhatsApp',
        'footer.about': 'À propos',
        'footer.contact': 'Contactez-nous',
        'checkout.title': 'Finaliser la commande',
        'checkout.form.name': 'Nom complet',
        'checkout.form.phone': 'Téléphone',
        'checkout.form.wilaya': 'Wilaya',
        'checkout.form.commune': 'Commune',
        'checkout.form.address': 'Adresse',
        'checkout.form.submit': 'Confirmer la commande',
        'checkout.success': 'Commande reçue avec succès!',
        'checkout.summary': 'Résumé de la commande',
        'checkout.delivery': 'Livraison',
        'checkout.total': 'Total',
        'admin.dashboard': 'Tableau de bord',
        'admin.products': 'Produits',
        'admin.orders': 'Commandes',
    },
    ar: {
        'nav.home': 'الرئيسية',
        'nav.categories': 'التصنيفات',
        'nav.contact': 'اتصل بنا',
        'hero.title': 'محل الفراشة',
        'hero.subtitle': 'اكتشف مجموعتنا الحصرية من الهدايا والإكسسوارات لتجعل كل لحظة مميزة.',
        'hero.cta': 'تصفح المجموعة',
        'featured.title': 'منتجات مميزة',
        'categories.title': 'تصنيفاتنا',
        'product.price': 'السعر',
        'product.order': 'اطلب الآن',
        'product.order_whatsapp': 'اطلب عبر واتساب',
        'footer.about': 'من نحن',
        'footer.contact': 'اتصل بنا',
        'checkout.title': 'إتمام الطلب',
        'checkout.form.name': 'الاسم الكامل',
        'checkout.form.phone': 'رقم الهاتف',
        'checkout.form.wilaya': 'الولاية',
        'checkout.form.commune': 'البلدية',
        'checkout.form.address': 'العنوان',
        'checkout.form.submit': 'تأكيد الطلب',
        'checkout.success': 'تم استلام طلبك بنجاح!',
        'checkout.summary': 'ملخص الطلب',
        'checkout.delivery': 'التوصيل',
        'checkout.total': 'المجموع',
        'admin.dashboard': 'لوحة التحكم',
        'admin.products': 'المنتجات',
        'admin.orders': 'الطلبات',
    }
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('fr');

    useEffect(() => {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
