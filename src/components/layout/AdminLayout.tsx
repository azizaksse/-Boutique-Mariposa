import { useEffect, useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Grid } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';

export function AdminLayout() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    const links = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/products', label: 'Products', icon: Package },
        { href: '/admin/categories', label: 'Categories', icon: Grid },
        { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-secondary-200 fixed h-full overflow-y-auto">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-primary-600">Mariposa Admin</h1>
                </div>
                <nav className="px-4 space-y-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === link.href
                                    ? "bg-primary-50 text-primary-700"
                                    : "text-secondary-600 hover:bg-secondary-50"
                            )}
                        >
                            <link.icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
}
