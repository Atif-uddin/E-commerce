import { useState, useEffect } from "react";
import { getAllCategories } from "../../api/category.api";

import CategoryTable from "../../components/admin/CategoryTable";
import CategoryModal from "../../components/admin/CategoryModal";

const Categories = () => {

    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const openCreateModal = () => {
        setSelectedCategory(null);
        setOpenModal(true);
    };

    const openEditModal = (category) => {
        setSelectedCategory(category);
        setOpenModal(true);
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
                onEdit = {openEditModal}
            />

            <CategoryModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                fetchCategories={fetchCategories}
                selectedCategory = {selectedCategory}
            />
        </div>
    );
};

export default Categories;
