import { useI18n } from '../../lib/i18n';
import { cn } from '../../lib/utils';
import { Heart, Facebook } from 'lucide-react';

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
                        <ul className="space-y-3">
                            <li>
                                <a href="https://www.facebook.com/Mariposa.Cadeaux" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-600">
                                    <Facebook className="h-5 w-5" />
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@mizou002hamza?_r=1&_t=ZS-91ok0NJhUyG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-600">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                    TikTok
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={cn("mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-900", language === 'ar' && "font-arabic")}>
                            {t('footer.contact')}
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-secondary-600">
                                +213 658 68 85 43
                            </li>
                            <li className="text-sm text-secondary-600">
                                medamine.261190@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-secondary-100 pt-8 text-center">
                    <p className="flex items-center justify-center gap-1 text-sm text-secondary-500">
                        Made with <Heart className="h-4 w-4 fill-primary-500 text-primary-500" /> in Algeria
                    </p>
                </div>
            </div>
        </footer>
    );
}
