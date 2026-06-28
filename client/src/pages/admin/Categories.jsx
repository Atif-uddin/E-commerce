import { useState, useEffect } from "react";
import { getAllCategories } from "../../api/category.api";

import CategoryTable from "../../components/admin/CategoryTable";
import CategoryModal from "../../components/admin/CategoryModal";

const Categories = () => {

    const [loading, setLoading] = useState([])
    const [category, setCategory] = useState(true)
    const [openModal, setOpenModal] = useState(false)

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
                    onClick={() => setOpenModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                    + Add Category
                </button>

            </div>

            <CategoryTable
                category={category}
                loading={loading}
            />

            <CategoryModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                fetchCategories={fetchCategories}
            />
        </div>
    );
};

export default Categories;
