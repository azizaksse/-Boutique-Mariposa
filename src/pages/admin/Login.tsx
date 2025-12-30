import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (password === 'hamzaadmin') {
            localStorage.setItem('admin_auth', 'true');
            navigate('/admin');
        } else {
            alert('Invalid password.');
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-secondary-100">
                <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn btn-primary w-full">
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
