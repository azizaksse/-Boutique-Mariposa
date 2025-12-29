import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('hamza@gmail.com');
    const [password, setPassword] = useState('hamza2a');
    const [loading, setLoading] = useState(false);

    const [isSignUp, setIsSignUp] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                alert(error.message);
            } else {
                alert('Account created! You can now login.');
                setIsSignUp(false);
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert(error.message);
            } else {
                navigate('/admin');
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-secondary-100">
                <h1 className="text-2xl font-bold text-center mb-8">Admin {isSignUp ? 'Sign Up' : 'Login'}</h1>
                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            placeholder="Email"
                            required
                        />
                    </div>
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
                        {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Login')}
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-sm text-secondary-600 hover:text-primary-600 underline"
                        >
                            {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
