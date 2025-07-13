// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/login', {
                username,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur de connexion');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700">Nom d'utilisateur</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">Mot de passe</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
}
