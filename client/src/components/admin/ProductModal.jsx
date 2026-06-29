import { useEffect, useState } from "react";

import { createProduct, updateProduct } from "../../api/product.api";
import { getAllCategories } from "../../api/category.api";

const ProductModal = ({ isOpen, onClose, fetchProducts, selectedProduct }) => {

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        category: "",
        images: ""
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
                stock: selectedProduct.stock,
                brand: selectedProduct.brand || "",
                category:
                    selectedProduct.category?._id ||
                    selectedProduct.category,
                images:
                    selectedProduct.images?.[0]?.url || ""
            });
        } else {
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                brand: "",
                category: "",
                images: ""
            });
        }
    }, [selectedProduct]);

    if (!isOpen) return null;
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);
            const payload = {
                name: formData.name,

                description: formData.description,

                price: Number(formData.price),

                stock: Number(formData.stock),

                brand: formData.brand,

                category: formData.category,

                images: formData.images
                    ? [
                        {
                            url: formData.images,
                            alt: formData.name
                        }
                    ]
                    : []
            };

            if (selectedProduct) {

                await updateProduct(
                    selectedProduct._id,
                    payload
                );
            } else {
                await createProduct(payload);
            }
            fetchProducts();
            onClose();

        } catch (error) {
            console.log(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-full max-w-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {
                            selectedProduct
                                ? "Edit Product"
                                : "Add Product"
                        }
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl">
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="w-full">
                    <p><strong>Name</strong></p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <p><strong>Description</strong></p>

                    <textarea
                        rows="4"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Price</strong></p>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                        />

                        <p><strong>Stock</strong></p>
                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                        />
                    </div>

                    <p><strong>Brand</strong></p>
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <p><strong>Category</strong></p>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 gap-2">

                        <option value=""> Select Category </option>
                        {
                            categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>

                    <p><strong>Upload Images</strong></p>
                    <input
                        type="text"
                        name="images"
                        placeholder="Image URL"
                        value={formData.images}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <div className="flex justify-end mt-5 gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-lg">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                            {
                                loading
                                    ? (
                                        selectedProduct
                                            ? "Updating..."
                                            : "Creating..."
                                    ) : (
                                        selectedProduct
                                            ? "Update Product"
                                            : "Add Product"
                                    )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;