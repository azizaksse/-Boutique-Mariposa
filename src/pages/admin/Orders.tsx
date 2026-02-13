import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { formatPrice } from '../../lib/utils';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { OrdersReportPDF } from '../../components/admin/OrdersReportPDF';
import { OrdersTableSkeleton } from '../../components/admin/OrdersTableSkeleton';
import { EditOrderSheet } from '../../components/admin/EditOrderSheet';
import { Calendar, Download, ShoppingBag, CreditCard, TrendingUp, Pencil } from 'lucide-react';

type TimeRange = 'today' | 'week' | 'month' | 'all';

export function Orders() {
    const [timeRange, setTimeRange] = useState<TimeRange>('all');
    const [displayOrders, setDisplayOrders] = useState<any[]>([]);
    const [displayStats, setDisplayStats] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [editingOrder, setEditingOrder] = useState<any | null>(null);

    // Calculate date range timestamps - recalculates when timeRange changes
    const { from, to } = useMemo(() => {
        const now = new Date();
        let from: number | undefined;
        let to: number | undefined;

        switch (timeRange) {
            case 'today':
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                from = today.getTime();
                to = now.getTime();
                break;
            case 'week':
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                weekAgo.setHours(0, 0, 0, 0);
                from = weekAgo.getTime();
                to = now.getTime();
                break;
            case 'month':
                const monthAgo = new Date();
                monthAgo.setMonth(now.getMonth() - 1);
                monthAgo.setHours(0, 0, 0, 0);
                from = monthAgo.getTime();
                to = now.getTime();
                break;
            case 'all':
            default:
                from = undefined;
                to = undefined;
                break;
        }
        return { from, to };
    }, [timeRange]);

    const orders = useQuery(api.orders.getOrdersByDate, { from, to });
    const stats = useQuery(api.orders.getDashboardStats, { from, to });
    const updateStatusMutation = useMutation(api.orders.updateStatus);

    async function updateStatus(id: Id<"orders">, status: string) {
        await updateStatusMutation({ id, status });
    }

    // Optimistic UI: Update display data when new data arrives
    useEffect(() => {
        if (orders !== undefined && stats !== undefined) {
            // New data has arrived
            setDisplayOrders(orders);
            setDisplayStats(stats);
            setIsTransitioning(false);
        } else {
            // Data is loading
            setIsTransitioning(true);
        }
    }, [orders, stats]);

    // Show skeleton only on very first load (no previous data)
    if (displayOrders.length === 0 && displayStats === null && orders === undefined) {
        return (
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-3xl font-extrabold text-secondary-900 tracking-tight">Sales Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 animate-pulse">
                            <div className="h-4 bg-secondary-200 rounded w-24 mb-2"></div>
                            <div className="h-8 bg-secondary-200 rounded w-32"></div>
                        </div>
                    ))}
                </div>

                <OrdersTableSkeleton />
            </div>
        );
    }

    // Cast stats to any to avoid type issues if API types aren't fully generated yet
    const dashboardStats = displayStats as any;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-extrabold text-secondary-900 tracking-tight">Sales Dashboard</h1>
                    <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-xs font-medium text-green-700">Live</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-secondary-200 shadow-sm">
                    {(['today', 'week', 'month', 'all'] as TimeRange[]).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${timeRange === range
                                ? 'bg-secondary-900 text-white shadow-md'
                                : 'text-secondary-600 hover:bg-secondary-100'
                                }`}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-secondary-500 mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-secondary-900">{formatPrice(dashboardStats?.totalRevenue || 0)}</h3>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl text-green-600">
                        <CreditCard className="h-6 w-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-secondary-500 mb-1">Total Orders</p>
                        <h3 className="text-3xl font-bold text-secondary-900">{dashboardStats?.totalOrders || 0}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                        <ShoppingBag className="h-6 w-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-secondary-500 mb-1">Avg. Order Value</p>
                        <h3 className="text-3xl font-bold text-secondary-900">{formatPrice(dashboardStats?.averageOrderValue || 0)}</h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-end">
                <PDFDownloadLink
                    document={<OrdersReportPDF orders={displayOrders as any[]} period={timeRange} />}
                    fileName={`sales_report_${timeRange}_${new Date().toISOString().split('T')[0]}.pdf`}
                    className="flex items-center gap-2 btn btn-secondary px-6 py-2.5 rounded-xl border-secondary-200 hover:border-primary-300 hover:bg-white transition-all shadow-sm"
                >
                    {({ loading: pdfLoading }) => (
                        <>
                            <Download className="h-4 w-4" />
                            {pdfLoading ? 'Preparing PDF...' : 'Export Report'}
                        </>
                    )}
                </PDFDownloadLink>
            </div>

            {/* Orders Table */}
            <div className={`bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden transition-opacity duration-300 ${isTransitioning ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
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
                            {displayOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-secondary-400">
                                        No orders found for this period.
                                    </td>
                                </tr>
                            ) : (
                                displayOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-secondary-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900 opacity-70">
                                            #{order._id.slice(0, 8)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                                            <div className="font-medium text-secondary-900">{order.full_name}</div>
                                            <div className="text-xs text-secondary-400">{order.phone}</div>
                                            <div className="text-xs text-secondary-400">{order.wilaya}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-secondary-900">
                                            {formatPrice(order.total)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full border 
                                                ${order.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    order.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-100' :
                                                        order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                            order.status === 'shipped' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                                'bg-gray-50 text-gray-700 border-gray-100'}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                                            {new Date(order._creationTime).toLocaleDateString()}
                                            <span className="text-xs text-secondary-400 block">{new Date(order._creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                                    className="text-sm border-secondary-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 py-1.5 pl-2 pr-8 bg-secondary-50/50"
                                                >
                                                    <option value="new">New</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                <button
                                                    onClick={() => setEditingOrder(order)}
                                                    className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                                                    title="Edit order"
                                                >
                                                    <Pencil className="h-4 w-4 text-secondary-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Order Sheet */}
            <EditOrderSheet
                order={editingOrder}
                isOpen={editingOrder !== null}
                onClose={() => setEditingOrder(null)}
                onSuccess={() => {
                    // The optimistic UI will automatically update when the mutation completes
                    setEditingOrder(null);
                }}
            />
        </div>
    );
}
