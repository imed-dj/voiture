import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VoitureList from '../components/VoitureList';
import VoitureForm from '../components/VoitureForm';

const VoiturePage = () => {
    const [voitures, setVoitures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentVoiture, setCurrentVoiture] = useState(null);

    useEffect(() => {
        fetchVoitures();
    }, []);

    const fetchVoitures = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/voitures');
            setVoitures(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Erreur lors du chargement');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/voitures/${id}`);
            setVoitures(prev => prev.filter(voiture => voiture.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Erreur lors de la suppression');
        }
    };

    const handleEdit = (voiture) => {
        setCurrentVoiture(voiture);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setCurrentVoiture(null);
        setIsFormOpen(true);
    };

    const handleFormSubmit = () => {
        setIsFormOpen(false);
        fetchVoitures();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestion des Voitures</h1>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Chargement...' : 'Ajouter une Voiture'}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" role="alert">
                    <p className="font-medium">Erreur :</p>
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <VoitureList
                    voitures={voitures}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            )}

            {isFormOpen && (
                <VoitureForm
                    voiture={currentVoiture}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleFormSubmit}
                    onError={(message) => setError(message)}
                />
            )}
        </div>
    );
};

export default VoiturePage;