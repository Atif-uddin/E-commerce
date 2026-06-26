import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllProducts } from "../../api/product.api";
import { getAllCategories } from "../../api/category.api";

import ProductCard from "../../components/product/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState('null')
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts({ search, page })
        console.log(response);
        setProducts(response.data || [])
        setPagination(response.pagination)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [search, page])


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories()

        setCategory(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return <h1>Loading Products...</h1>
  }

  return (
    <div className="p-5">

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      <h2 className="text-3xl font-bold mb-6">
        Shop By Category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">

        <div className="flex gap-6 overflow-x-auto pb-4">

          {
            category.map(category => (

              <div
                key={category._id}
                onClick={() =>
                  navigate(`/category/${category.slug}`)
                }
                className="flex flex-col items-center cursor-pointer min-w-90px">

                <img
                  src={
                    category.images?.[0]?.url ||
                    "https://placehold.co/100x100"
                  }
                  alt={category.name}
                  className="w-20 h-20 rounded-full object-cover border-2 hover:scale-105 transition"
                />

                <span className="mt-2 text-sm font-medium text-center">
                  {category.name}
                </span>

              </div>

            ))
          }

        </div>

      </div>
      <h1 className="text-3xl font-bold mb-5">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {
          products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        }
      </div>

      {
        pagination?.totalPages > 1 && (

          <div className="flex justify-center mt-4">

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
              className="border px-4 py-2  rounded disabled:opacity-50">
              Next
            </button>

          </div>

        )
      }
    </div>
  )
}

export default Home