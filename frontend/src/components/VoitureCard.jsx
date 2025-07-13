import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const VoitureCard = ({ voiture, onDelete, onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {voiture.marque} {voiture.modele}
                </h2>
                <p className="text-gray-600">Année: {voiture.annee}</p>
                <p className="text-gray-600">Couleur: {voiture.couleur}</p>
                <p className="text-gray-600">Prix: {voiture.prix_location} €/jour</p>
                <p className="text-gray-600">Matricule: {voiture.matricule}</p>

                <div className="mt-4 flex space-x-2">
                    <button
                        onClick={() => onEdit(voiture)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Modifier
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Supprimer
                    </button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    onDelete(voiture.id);
                    setIsModalOpen(false);
                }}
                title="Confirmer la suppression"
                message={`Êtes-vous sûr de vouloir supprimer ${voiture.marque} ${voiture.modele}?`}
            />
        </div>
    );
};

export default VoitureCard;