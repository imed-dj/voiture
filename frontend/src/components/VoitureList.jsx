import React from 'react';
import VoitureCard from './VoitureCard';

const VoitureList = ({ voitures, onDelete, onEdit }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voitures.map((voiture) => (
                <VoitureCard
                    key={voiture.id}
                    voiture={voiture}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default VoitureList;