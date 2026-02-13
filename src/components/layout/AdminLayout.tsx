import { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Grid, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminLayout() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isAuthed = localStorage.getItem('admin_auth') === 'true';
    if (!isAuthed) {
        return <Navigate to="/admin/login" replace />;
    }

    const links = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/products', label: 'Products', icon: Package },
        { href: '/admin/categories', label: 'Categories', icon: Grid },
        { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-secondary-200 px-4 py-3 flex items-center justify-between">
                <h1 className="text-lg font-bold text-primary-600">Mariposa Admin</h1>
                <button onClick={toggleSidebar} className="p-2 text-secondary-600 hover:bg-secondary-50 rounded-md">
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-secondary-200 transform transition-transform duration-200 ease-in-out md:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="hidden md:block p-6">
                    <h1 className="text-xl font-bold text-primary-600">Mariposa Admin</h1>
                </div>
                <div className="md:hidden p-6">
                    {/* Spacer for mobile header */}
                </div>
                <nav className="px-4 space-y-1 mt-14 md:mt-0">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setIsSidebarOpen(false)}
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
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all duration-200">
                <Outlet />
            </main>
        </div>
    );
}
