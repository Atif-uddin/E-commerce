import { useEffect, useState } from "react";

import { getAllProducts, deleteProduct } from "../../api/product.api";

import ProductTable from "../../components/admin/ProductTable";
import ProductModal from "../../components/admin/ProductModal";
import DeleteModal from "../../components/admin/DeleteModal";

const Products = () => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await getAllProducts();

            setProducts(response.data);

        } catch (error) {
            console.log(error.response?.data?.message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const openCreateModal = () => {
        setSelectedProduct(null);
        setOpenModal(true);
    };

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const openDeleteModal = (product) => {
        setSelectedDeleteProduct(product);
        setDeleteModal(true);
    };

    const deleteHandler = async () => {
        try {

            setLoading(true);

            await deleteProduct(selectedDeleteProduct._id);

            fetchProducts();

            setDeleteModal(false);
            setSelectedDeleteProduct(null);

        } catch (error) {

            console.log(error.response?.data?.message);;

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="p-6">

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                    + Add Product
                </button>

            </div>

            <ProductTable
                products={products}
                loading={loading}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />

            <ProductModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                selectedProduct={selectedProduct}
                fetchProducts={fetchProducts}
            />

            <DeleteModal
                isOpen={deleteModal}
                title="Delete Product"
                message={`Are you sure you want to delete "${selectedDeleteProduct?.name}"?`}
                loading={loading}
                onClose={() => setDeleteModal(false)}
                onConfirm={deleteHandler}
            />

        </div>
    );
};

export default Products;