import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/layout/AdminLayout';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { ProductDetails } from './pages/ProductDetails';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { Products } from './pages/admin/Products';
import { Categories as AdminCategories } from './pages/admin/Categories';
import { Orders } from './pages/admin/Orders';
import { initPixel, trackPageView } from './lib/pixel';

function PixelTracker() {
    const location = useLocation();

    useEffect(() => {
        initPixel();
    }, []);

    useEffect(() => {
        trackPageView();
    }, [location]);

    return null;
}

function App() {
    return (
        <BrowserRouter>
            <PixelTracker />
            <Routes>
                {/* Public Routes */}
                <Route element={<Layout><Outlet /></Layout>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/checkout/:id" element={<Checkout />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="orders" element={<Orders />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
