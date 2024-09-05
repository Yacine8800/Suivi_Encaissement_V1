import React from 'react';

interface ForgotPasswordModalProps {
    closeModal: () => void;
}

export default function ForgotPasswordModal({ closeModal }: ForgotPasswordModalProps) {
    const handleForgotPassword = (e: any) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
                <h3 className="text-2xl font-bold mb-4">Mot de passe oublié</h3>
                <p className="text-gray-500 mb-4">
                    Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.
                </p>
                <form onSubmit={handleForgotPassword}>
                    <input
                        type="email"
                        placeholder="Entrez votre adresse mail"
                        className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500 mb-4"
                        required
                    />
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-md"
                            onClick={closeModal} // Close the modal when the button is clicked
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-orange-500 text-white hover:bg-orange-600 rounded-md"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
