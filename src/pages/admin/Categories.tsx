import { useEffect, useState } from 'react';
import { Plus, Edit, Trash, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { Category } from '../../types';
import { ImageUpload } from '../../components/ui/ImageUpload';

export function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const { data } = await supabase.from('categories').select('*');
        if (data) setCategories(data);
        setLoading(false);
    }

    const openModal = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setValue('name_fr', category.name_fr);
            setValue('name_ar', category.name_ar);
        } else {
            setEditingCategory({ image: '' } as any);
            reset();
        }
        setIsModalOpen(true);
    };

    const onSubmit = async (data: any) => {
        const categoryData = {
            ...data,
            slug: data.name_fr.toLowerCase().replace(/ /g, '-'),
            image: editingCategory?.image || null,
        };

        if (editingCategory?.id) {
            await supabase.from('categories').update(categoryData).eq('id', editingCategory.id);
        } else {
            await supabase.from('categories').insert([categoryData]);
        }

        setIsModalOpen(false);
        fetchData();
    };

    const deleteCategory = async (id: string) => {
        if (confirm('Are you sure?')) {
            await supabase.from('categories').delete().eq('id', id);
            fetchData();
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <button onClick={() => openModal()} className="btn btn-primary w-full sm:w-auto">
                    <Plus className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Add Category</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white p-4 rounded-xl shadow-sm border border-secondary-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">{category.name_fr}</h3>
                            <p className="text-sm text-secondary-500">{category.name_ar}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openModal(category)} className="p-2 text-secondary-600 hover:bg-secondary-50 rounded-full">
                                <Edit className="h-5 w-5" />
                            </button>
                            <button onClick={() => deleteCategory(category.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                                <Trash className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6" /></button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="label">Name (FR)</label>
                                <input {...register('name_fr')} className="input" required />
                            </div>
                            <div>
                                <label className="label">Name (AR)</label>
                                <input {...register('name_ar')} className="input" dir="rtl" required />
                            </div>

                            <div>
                                <label className="label">Image</label>
                                <ImageUpload
                                    value={editingCategory?.image ? [editingCategory.image] : []}
                                    onChange={(urls) => {
                                        setEditingCategory(prev => prev ? { ...prev, image: urls[0] } : { ...{} as Category, image: urls[0] });
                                    }}
                                    bucket="categories"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Save Category</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
