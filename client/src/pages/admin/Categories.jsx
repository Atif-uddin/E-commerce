import { useState, useEffect } from "react";
import { getAllCategories } from "../../api/category.api";

import CategoryTable from "../../components/admin/CategoryTable";
import CategoryModal from "../../components/admin/CategoryModal";
import DeleteModal from "../../components/admin/DeleteModal";

const Categories = () => {

    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

    const openCreateModal = () => {
        setSelectedCategory(null);
        setOpenModal(true);
    };

    const openEditModal = (category) => {
        setSelectedCategory(category);
        setOpenModal(true);
    };

    const openDeleteModal = (category) => {
        console.log("Delete clicked:", category);

        setSelectedDeleteCategory(category);
        setDeleteModal(true);
    };

    const deleteHandler = async () => {
        try {
            setLoading(true);
            await deleteCategory(selectedDeleteCategory._id);
            fetchCategories();
            setDeleteModal(false);
            setSelectedDeleteCategory(null);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {

            setLoading(true)

            const response = await getAllCategories()

            setCategory(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (

        <div className="p-6">

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-3xl font-bold">
                    Categories
                </h1>

                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                    + Add Category
                </button>

            </div>

            <CategoryTable
                category={category}
                loading={loading}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />

            <CategoryModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                fetchCategories={fetchCategories}
                selectedCategory={selectedCategory}
            />

            <DeleteModal
                isOpen={deleteModal}
                title="Delete Category"
                message={`Are you sure you want to delete "${selectedDeleteCategory?.name}"?`}
                onConfirm={deleteHandler}
                onClose={() => setDeleteModal(false)}
                loading={loading}
            />
        </div>
    );
};

export default Categories;
