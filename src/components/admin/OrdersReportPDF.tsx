import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    date: {
        fontSize: 10,
        color: '#6b7280',
        marginTop: 10,
    },
    summary: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#f9fafb',
        padding: 10,
        borderRadius: 4,
    },
    summaryItem: {
        marginRight: 30,
    },
    summaryLabel: {
        fontSize: 10,
        color: '#6b7280',
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCol: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: '#e5e7eb',
    },
    tableHeader: {
        backgroundColor: '#f3f4f6',
        fontWeight: 'bold',
    },
    tableCell: {
        margin: 5,
        fontSize: 10,
    },
    statusNew: { color: '#2563eb' },
    statusConfirmed: { color: '#16a34a' },
    statusCancelled: { color: '#dc2626' },
    statusShipped: { color: '#9333ea' },
    statusDelivered: { color: '#059669' },
});

interface Order {
    _id: string;
    _creationTime: number;
    full_name: string;
    phone: string;
    total: number;
    status: string;
}

interface OrdersReportPDFProps {
    orders: Order[];
    period: string;
}

// Helper for currency formatting if imported utils fail in PDF context
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-DZ', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const OrdersReportPDF = ({ orders, period }: OrdersReportPDFProps) => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Sales Report</Text>
                        <Text style={{ fontSize: 12, color: '#4b5563', marginTop: 4 }}>Boutique Mariposa</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.date}>Generated: {new Date().toLocaleString()}</Text>
                        <Text style={{ fontSize: 12, marginTop: 4 }}>Period: {period}</Text>
                    </View>
                </View>

                {/* Summary */}
                <View style={styles.summary}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Total Revenue</Text>
                        <Text style={styles.summaryValue}>{formatCurrency(totalRevenue)}</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Total Orders</Text>
                        <Text style={styles.summaryValue}>{totalOrders}</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Average Order Value</Text>
                        <Text style={styles.summaryValue}>
                            {totalOrders > 0 ? formatCurrency(totalRevenue / totalOrders) : formatCurrency(0)}
                        </Text>
                    </View>
                </View>

                {/* Table */}
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>Order ID</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>Date</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                            <Text style={styles.tableCell}>Customer</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>Total</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>Status</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>Phone</Text>
                        </View>
                    </View>

                    {orders.map((order) => (
                        <View key={order._id} style={styles.tableRow}>
                            <View style={[styles.tableCol, { width: '15%' }]}>
                                <Text style={styles.tableCell}>#{order._id.slice(0, 8)}</Text>
                            </View>
                            <View style={[styles.tableCol, { width: '15%' }]}>
                                <Text style={styles.tableCell}>{new Date(order._creationTime).toLocaleDateString()}</Text>
                            </View>
                            <View style={[styles.tableCol, { width: '25%' }]}>
                                <Text style={styles.tableCell}>{order.full_name}</Text>
                            </View>
                            <View style={[styles.tableCol, { width: '15%' }]}>
                                <Text style={styles.tableCell}>{formatCurrency(order.total)}</Text>
                            </View>
                            <View style={[styles.tableCol, { width: '15%' }]}>
                                <Text style={[styles.tableCell,
                                order.status === 'new' ? styles.statusNew :
                                    order.status === 'confirmed' ? styles.statusConfirmed :
                                        order.status === 'cancelled' ? styles.statusCancelled :
                                            order.status === 'shipped' ? styles.statusShipped :
                                                order.status === 'delivered' ? styles.statusDelivered : {}
                                ]}>
                                    {order.status}
                                </Text>
                            </View>
                            <View style={[styles.tableCol, { width: '15%' }]}>
                                <Text style={styles.tableCell}>{order.phone}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};
