import { useState } from "react";

import { createCategory } from "../../api/category.api";

const CategoryModal = ({ isOpen, onClose, fetchCategories }) => {

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        images: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    if (!isOpen) return null;

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);
            const payload = {
                name: formData.name,
                description: formData.description,
                images: formData.images
                    ? [{
                        url: formData.images,
                        alt: formData.name
                    }] : []
            };

            const response = await createCategory(payload);

            alert(response.message);

            fetchCategories();
            setFormData({
                name: "",
                description: "",
                images: ""
            });

            onClose();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-full max-w-lg p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Add Category
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl font-bold">
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5">

                    <div>

                        <label className="block font-medium mb-2">
                            Category Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter category name"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Enter description"
                            className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block font-medium mb-2">
                            Image URL
                        </label>

                        <input
                            type="text"
                            name="images"
                            value={formData.images}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border rounded-lg hover:bg-gray-100">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            {loading ? "Creating..." : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CategoryModal;