import { Calendar } from 'lucide-react';

export function OrdersTableSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200">
                    <thead className="bg-secondary-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-secondary-200">
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-secondary-200 rounded w-20"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="space-y-2">
                                        <div className="h-4 bg-secondary-200 rounded w-32"></div>
                                        <div className="h-3 bg-secondary-100 rounded w-24"></div>
                                        <div className="h-3 bg-secondary-100 rounded w-20"></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-5 bg-secondary-200 rounded w-24"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-6 bg-secondary-200 rounded-full w-20"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="space-y-1">
                                        <div className="h-4 bg-secondary-200 rounded w-24"></div>
                                        <div className="h-3 bg-secondary-100 rounded w-16"></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-8 bg-secondary-200 rounded w-28"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
