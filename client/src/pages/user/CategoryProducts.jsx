import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getAllCategories } from "../../api/category.api";
import { getAllProducts } from "../../api/product.api";

import ProductCard from "../../components/product/ProductCard";

const CategoryProducts = () => {

    const { slug } = useParams()

    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('newest')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getAllCategories()

                const matchedCategory = response.data.find(category => category.slug == slug)

                setCategory(matchedCategory)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategory()
    }, [slug])

    useEffect(() => {

        if (!category) return
        const fetchProducts = async () => {
            try {
                setLoading(true)

                const response = await getAllProducts({ category: category._id, search, sort, page })
                setProducts(response.data || [])
                setPagination(response.pagination)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [category, search, sort, page])

    useEffect(() => {
        setPage(1)
    }, [search, sort, category])

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto p-5">
                <h1>Loading Category...</h1>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-5">

            <div className="flex items-center gap-4 mb-6">

                <img
                    src={
                        category.images?.[0]?.url ||
                        "https://placehold.co/100x100"
                    }
                    alt={category.name}
                    className="w-16 h-16 rounded-full object-cover" />

                <div>

                    <h1 className="text-3xl font-bold">
                        {category.name}
                    </h1>

                    <p className="text-gray-500">
                        {category.description}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder={`Search in ${category.name}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-3"
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className=" border rounded-lg p-3">

                    <option value="newest">
                        Newest
                    </option>

                    <option value="oldest">
                        Oldest
                    </option>

                    <option value="price_asc">
                        Price Low → High
                    </option>

                    <option value="price_desc">
                        Price High → Low
                    </option>
                </select>

            </div>
            {
                loading ? (

                    <h2>Loading Products...</h2>

                ) : products.length === 0 ? (

                    <div className="text-center py-10">
                        <h2 className="text-2xl font-semibold">
                            No Products Found
                        </h2>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {
                            products.map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))
                        }
                    </div>
                )

            }

            {
                pagination?.totalPages > 1 && (

                    <div className="flex justify-center gap-3 mt-8">

                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="border px-4 py-2 rounded disabled:opacity-50">
                            Previous
                        </button>

                        <span className="px-4 py-2">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>

                        <button
                            disabled={page === pagination.totalPages}
                            onClick={() => setPage(page + 1)}
                            className="border px-4 py-2 rounded disabled:opacity-50">
                            Next
                        </button>

                    </div>

                )
            }
        </div>
    );
};

export default CategoryProducts;
