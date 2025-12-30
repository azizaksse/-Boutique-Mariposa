import { useEffect, useState } from 'react';
import { Plus, Edit, Trash, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { Product, Category } from '../../types';
import { formatPrice } from '../../lib/utils';
import { ImageUpload } from '../../components/ui/ImageUpload';

export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const [prodRes, catRes] = await Promise.all([
            supabase.from('products').select('*').order('created_at', { ascending: false }),
            supabase.from('categories').select('*')
        ]);

        if (prodRes.data) setProducts(prodRes.data);
        if (catRes.data) setCategories(catRes.data);
        setLoading(false);
    }

    const openModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setValue('name', product.name_fr);
            setValue('price', product.price);
            setValue('old_price', product.old_price);
            setValue('category_id', product.category_id);
            setMainImage(product.images?.[0] || null);
            setGalleryImages(product.images?.slice(1) || []);
            setValue('featured', product.featured);
        } else {
            setEditingProduct(null);
            setMainImage(null);
            setGalleryImages([]);
            reset();
        }
        setIsModalOpen(true);
    };

    const onSubmit = async (data: any) => {
        const name = String(data.name || '').trim();
        const price = data.price === '' || data.price == null ? null : Number(data.price);
        const oldPrice = data.old_price === '' || data.old_price == null ? null : Number(data.old_price);
        const images = [mainImage, ...galleryImages].filter(Boolean) as string[];
        const productData = {
            name_fr: name,
            name_ar: name,
            category_id: data.category_id,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            price,
            old_price: oldPrice,
            images,
            featured: !!data.featured
        };

        const response = editingProduct?.id
            ? await supabase.from('products').update(productData).eq('id', editingProduct.id)
            : await supabase.from('products').insert([productData]);

        if (response.error) {
            console.error(response.error);
            alert(response.error.message || 'Failed to save product.');
            return;
        }

        setIsModalOpen(false);
        setEditingProduct(null);
        fetchData();
    };

    const deleteProduct = async (id: string) => {
        if (confirm('Are you sure?')) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) {
                console.error(error);
                alert(error.message || 'Failed to delete product.');
                return;
            }
            fetchData();
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <button onClick={() => openModal()} className="btn btn-primary w-full sm:w-auto">
                    <Plus className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Add Product</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-secondary-100 flex flex-col">
                        <div className="aspect-video bg-secondary-100 rounded-lg mb-4 overflow-hidden">
                            {product.images?.[0] && <img src={product.images[0]} className="h-full w-full object-cover" />}
                        </div>
                        <h3 className="font-medium text-lg">{product.name_fr}</h3>
                        <p className="text-primary-600 font-bold">{formatPrice(product.price)}</p>
                        <div className="mt-auto pt-4 flex justify-end gap-2">
                            <button onClick={() => openModal(product)} className="p-2 text-secondary-600 hover:bg-secondary-50 rounded-full">
                                <Edit className="h-5 w-5" />
                            </button>
                            <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                                <Trash className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6" /></button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Name</label>
                                    <input {...register('name')} className="input" required />
                                </div>
                                <div>
                                    <label className="label">Price</label>
                                    <input type="number" {...register('price')} className="input" required />
                                </div>
                                <div>
                                    <label className="label">Old Price</label>
                                    <input type="number" {...register('old_price')} className="input" />
                                </div>
                            </div>

                            <div>
                                <label className="label">Category</label>
                                <select {...register('category_id')} className="input" required>
                                    <option value="">Select Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name_fr}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label">Principal Image</label>
                                <ImageUpload
                                    value={mainImage ? [mainImage] : []}
                                    onChange={(urls) => setMainImage(urls[0] || null)}
                                    bucket="products"
                                />
                            </div>

                            <div>
                                <label className="label">Gallery Images</label>
                                <ImageUpload
                                    value={galleryImages}
                                    onChange={setGalleryImages}
                                    bucket="products"
                                    multiple
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" {...register('featured')} id="featured" />
                                <label htmlFor="featured" className="text-sm font-medium">Show on home page</label>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">Save Product</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
