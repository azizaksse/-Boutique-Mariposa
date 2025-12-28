import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Order } from '../../types';
import { formatPrice } from '../../lib/utils';

export function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        const { data } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setOrders(data);
        setLoading(false);
    }

    async function updateStatus(id: string, status: string) {
        await supabase.from('orders').update({ status }).eq('id', id);
        fetchOrders();
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden">
                <table className="min-w-full divide-y divide-secondary-200">
                    <thead className="bg-secondary-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-secondary-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">#{order.id.slice(0, 8)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                                    <div>{order.full_name}</div>
                                    <div className="text-xs">{order.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{formatPrice(order.total)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className="text-sm border-secondary-300 rounded-md"
                                    >
                                        <option value="new">New</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
