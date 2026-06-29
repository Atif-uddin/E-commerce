import { useState } from "react";
import { deleteCategory } from "../../api/category.api";

const DeleteModal = ({ isOpen, title, onClose, onConfirm, message, loading }) => {

    if (!isOpen) return null;

     return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-400px">

                <h2 className="text-xl font-bold mb-4">
                    {title}
                </h2>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg">
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg">
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;