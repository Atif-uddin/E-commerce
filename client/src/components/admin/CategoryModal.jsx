import { useState, useEffect } from "react";

import { createCategory, updateCategory } from "../../api/category.api";


const CategoryModal = ({ isOpen, onClose, fetchCategories, selectedCategory }) => {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        images: ""
    });

    useEffect(() => {
        console.log("Selected Category:", selectedCategory);

        if (selectedCategory) {
            setFormData({
                name: selectedCategory.name,
                description: selectedCategory.description || "",
                images: selectedCategory.images?.[0]?.url || ""
            });
        } else {
            setFormData({
                name: "",
                description: "",
                images: ""
            });
        }
    }, [selectedCategory]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    if (!isOpen) return null;

    const handleSubmit = async (e) => {

        setMessage("");
        setError("");
        e.preventDefault();

        try {

            setLoading(true);

            const payload = {
                name: formData.name,
                description: formData.description,
                images: formData.images
                    ? [
                        {
                            url: formData.images,
                            alt: formData.name
                        }
                    ]
                    : []
            };

            if (selectedCategory) {

                await updateCategory(
                    selectedCategory._id,
                    payload
                );
                setMessage("Category updated successfully!");
            } else {
                await createCategory(payload);
                setMessage("Category created successfully!");
            }

            fetchCategories();
            setTimeout(() => {
                onClose();
            }, 1000);

        } catch (error) {
            setError(
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
                        {selectedCategory ? "Edit Category" : "Add Category"}
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

                    {message && (
                        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                            <p className="text-green-700 font-medium">
                                {message}
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-red-700 font-medium">
                                {error}
                            </p>
                        </div>
                    )}

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
                            {
                                loading
                                    ? (
                                        selectedCategory ? "Updating..." : "Creating...")
                                    : (selectedCategory ? "Update Category" : "Add Category")
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CategoryModal;