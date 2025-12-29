import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { cn } from '../../lib/utils';

export function Navbar() {
    const { t, language, setLanguage } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleLanguage = () => {
        setLanguage(language === 'fr' ? 'ar' : 'fr');
    };

    const links = [
        { href: '/', label: t('nav.home') },
        { href: '/categories', label: t('nav.categories') },
        { href: '/contact', label: t('nav.contact') },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full rounded-b-[2.5rem] border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-lg transition-all duration-300">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl sm:text-3xl md:text-4xl">🦋</span>
                        <span className={cn("text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-primary-600 font-signore", language === 'ar' && "font-arabic")}>
                            {t('hero.title')}
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary-600",
                                location.pathname === link.href ? "text-primary-600" : "text-secondary-600",
                                language === 'ar' && "font-arabic"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 rounded-full border border-secondary-200 px-3 py-1.5 text-xs font-medium text-secondary-700 hover:bg-secondary-50"
                    >
                        <Globe className="h-3.5 w-3.5" />
                        <span>{language === 'fr' ? 'AR' : 'FR'}</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 rounded-full border border-secondary-200 px-2 py-1 text-xs font-medium text-secondary-700"
                    >
                        {language === 'fr' ? 'AR' : 'FR'}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-secondary-600 hover:text-primary-600"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-secondary-100 bg-white px-4 py-4 shadow-lg">
                    <div className="flex flex-col gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-base font-medium",
                                    location.pathname === link.href ? "text-primary-600" : "text-secondary-600",
                                    language === 'ar' && "font-arabic"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
