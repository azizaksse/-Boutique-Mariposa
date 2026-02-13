import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Trash2 } from 'lucide-react';

// Form validation schema
const orderFormSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number is required'),
    wilaya: z.string().min(1, 'Wilaya is required'),
    commune: z.string().min(1, 'Commune is required'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    delivery_method: z.string(),
    delivery_fee: z.number().min(0),
    total: z.number().min(0, 'Total must be positive'),
    status: z.string(),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

interface EditOrderSheetProps {
    order: any | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function EditOrderSheet({
    order,
    isOpen,
    onClose,
    onSuccess,
}: EditOrderSheetProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const updateOrderMutation = useMutation(api.orders.updateOrder);
    const deleteOrderMutation = useMutation(api.orders.deleteOrder);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderFormSchema),
        values: order ? {
            full_name: order.full_name,
            phone: order.phone,
            wilaya: order.wilaya,
            commune: order.commune,
            address: order.address,
            delivery_method: order.delivery_method,
            delivery_fee: order.delivery_fee,
            total: order.total,
            status: order.status,
        } : undefined,
    });

    const onSubmit = async (data: OrderFormData) => {
        if (!order) return;

        try {
            await updateOrderMutation({
                id: order._id,
                updates: data,
            });
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Failed to update order:', error);
            alert('Failed to update order. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (!order) return;

        setIsDeleting(true);
        try {
            await deleteOrderMutation({ id: order._id });
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Failed to delete order:', error);
            alert('Failed to delete order. Please try again.');
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    if (!isOpen || !order) return null;

    const statusColors: Record<string, string> = {
        new: 'bg-blue-50 text-blue-700 border-blue-100',
        confirmed: 'bg-green-50 text-green-700 border-green-100',
        shipped: 'bg-purple-50 text-purple-700 border-purple-100',
        delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        cancelled: 'bg-gray-50 text-gray-700 border-gray-100',
        returned: 'bg-red-50 text-red-700 border-red-100',
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Sheet */}
            <div className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-secondary-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-secondary-900">
                            Edit Order #{order._id.slice(0, 8)}
                        </h2>
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[order.status] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-secondary-600" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary-900 border-b pb-2">
                            Customer Information
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                                Full Name
                            </label>
                            <input
                                {...register('full_name')}
                                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                            {errors.full_name && (
                                <p className="text-red-600 text-sm mt-1">{errors.full_name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                                Phone
                            </label>
                            <input
                                {...register('phone')}
                                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                            {errors.phone && (
                                <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Wilaya
                                </label>
                                <input
                                    {...register('wilaya')}
                                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                                {errors.wilaya && (
                                    <p className="text-red-600 text-sm mt-1">{errors.wilaya.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Commune
                                </label>
                                <input
                                    {...register('commune')}
                                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                                {errors.commune && (
                                    <p className="text-red-600 text-sm mt-1">{errors.commune.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                                Address
                            </label>
                            <textarea
                                {...register('address')}
                                rows={3}
                                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                            {errors.address && (
                                <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary-900 border-b pb-2">
                            Order Details
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                                Status
                            </label>
                            <select
                                {...register('status')}
                                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="new">New</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="returned">Returned</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Delivery Method
                                </label>
                                <select
                                    {...register('delivery_method')}
                                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option value="home">Home Delivery</option>
                                    <option value="desk">Desk/Office</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Delivery Fee (DZD)
                                </label>
                                <input
                                    type="number"
                                    {...register('delivery_fee', { valueAsNumber: true })}
                                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                                Total Price (DZD)
                            </label>
                            <input
                                type="number"
                                {...register('total', { valueAsNumber: true })}
                                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                            {errors.total && (
                                <p className="text-red-600 text-sm mt-1">{errors.total.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-secondary-200 px-6 py-4 -mx-6 -mb-6 mt-8 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setShowDeleteDialog(true)}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete Order
                        </button>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-secondary-900 text-white rounded-lg hover:bg-secondary-800 transition-colors font-medium disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <>
                    <div className="fixed inset-0 bg-black/70 z-[60]" onClick={() => setShowDeleteDialog(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 max-w-md w-full z-[70]">
                        <h3 className="text-lg font-bold text-secondary-900 mb-2">
                            Delete Order?
                        </h3>
                        <p className="text-secondary-600 mb-6">
                            Are you sure you want to delete this order? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteDialog(false)}
                                className="px-4 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Order'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
