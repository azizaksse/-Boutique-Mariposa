
export function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-secondary-100">
                    <h3 className="text-secondary-500 font-medium">Total Orders</h3>
                    <p className="text-3xl font-bold text-secondary-900 mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-secondary-100">
                    <h3 className="text-secondary-500 font-medium">Total Products</h3>
                    <p className="text-3xl font-bold text-secondary-900 mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-secondary-100">
                    <h3 className="text-secondary-500 font-medium">Revenue</h3>
                    <p className="text-3xl font-bold text-secondary-900 mt-2">0 DA</p>
                </div>
            </div>
        </div>
    );
}
