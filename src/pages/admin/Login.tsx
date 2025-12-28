import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        } else {
            navigate('/admin');
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-secondary-100">
                <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
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
