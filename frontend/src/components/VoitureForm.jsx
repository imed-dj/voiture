import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoitureForm = ({ voiture, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        annee: '',
        couleur: '',
        prix_location: '',
        matricule: '',
        numero_chassis: ''
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (voiture) {
            setFormData(voiture);
        }
    }, [voiture]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (voiture) {
                await axios.put(`http://localhost:5000/api/voitures/${voiture.id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/voitures', formData);
            }
            onSubmit();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            {voiture ? 'Modifier Voiture' : 'Ajouter Voiture'}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Marque *</label>
                            <input
                                type="text"
                                name="marque"
                                value={formData.marque}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Ajoutez les autres champs de formulaire de la même manière */}

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                {voiture ? 'Mettre à jour' : 'Ajouter'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VoitureForm;