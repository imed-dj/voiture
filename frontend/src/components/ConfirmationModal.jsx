import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="mb-6">{message}</p>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={onConfirm}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Confirmer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;