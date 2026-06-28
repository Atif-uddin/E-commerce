import { useState } from "react";
import { deleteCategory } from "../../api/category.api";

const DeleteModal = ({ isOpen, onClose, category, fetchCategories }) => {

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const deleteHandler = async () => {
        try {
            setLoading(true);

            await deleteCategory(category._id);

            fetchCategories();

            onClose();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-[400px]">

                <h2 className="text-xl font-bold mb-4">
                    Delete Category
                </h2>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete
                    <span className="font-bold">
                        {" "}
                        {category?.name}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={deleteHandler}
                        disabled={loading}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeleteModal;