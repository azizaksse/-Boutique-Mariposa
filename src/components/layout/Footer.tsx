import { Link } from 'react-router-dom';
import { useI18n } from '../../lib/i18n';
import { cn } from '../../lib/utils';
import { Heart, Facebook, Phone, Mail } from 'lucide-react';

export function Footer() {
    const { t, language } = useI18n();

    return (
        <footer className="border-t border-secondary-100 bg-white pt-12 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🦋</span>
                            <span className={cn("text-xl font-bold text-primary-600", language === 'ar' && "font-arabic")}>
                                {t('hero.title')}
                            </span>
                        </div>
                        <p className={cn("text-sm text-secondary-500", language === 'ar' && "font-arabic")}>
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    <div>
                        <h3 className={cn("mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-900", language === 'ar' && "font-arabic")}>
                            {t('footer.about')}
                        </h3>
                        <div className="flex gap-4 mb-6">
                            <a
                                href="https://www.facebook.com/Mariposa.Cadeaux"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@mizou002hamza?_r=1&_t=ZS-91ok0NJhUyG"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 flex items-center justify-center rounded-full bg-black/5 text-black hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="TikTok"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className={cn("mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-900", language === 'ar' && "font-arabic")}>
                            {t('footer.contact')}
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://wa.me/213542511554"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-bold overflow-hidden transition-all duration-300 hover:bg-green-700 hover:scale-105 shadow-lg shadow-green-600/30"
                                >
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"></div>
                                    <Phone className="h-5 w-5 animate-pulse" />
                                    <span dir="ltr" className="relative z-20 text-lg tracking-wide">0542 51 15 54</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-secondary-600">
                                <Mail className="h-4 w-4" />
                                medamine.261190@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-secondary-100 pt-8 text-center">
                    <p className="flex items-center justify-center gap-1 text-sm text-secondary-500">
                        Made with <Heart className="h-4 w-4 fill-primary-500 text-primary-500" /> in Algeria
                    </p>
                    <div className="mt-4">
                        <Link to="/admin/login" className="text-xs font-semibold uppercase tracking-wider text-secondary-400 hover:text-primary-600 transition-colors">
                            Administration
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
