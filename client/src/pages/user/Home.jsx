import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllProducts } from "../../api/product.api";
import { getAllCategories } from "../../api/category.api";

import ProductCard from "../../components/product/ProductCard";
import Hero from "../../components/user/Hero";

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

      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      <Hero />

      <section className="py-2 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Shop By Category
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Explore our most popular collections
            </p>
          </div>

          {/* Categories */}
          <div className="flex gap-8 overflow-x-auto px-2 py-3 scrollbar-hide">

            {category.map((category) => (

              <div
                key={category._id}
                onClick={() => navigate(`/category/${category.slug}`)}
                className="
                  group
                  cursor-pointer
                  text-center
                "
              >

                <div
                  className="
                    w-32
                    h-32
                    rounded-full
                    bg-white
                    shadow-md
                    border
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    group-hover:shadow-2xl
                    group-hover:-translate-y-2
                    group-hover:scale-105
                  "
                >

                  <img
                    src={
                      category.images?.[0]?.url ||
                      "https://placehold.co/120x120"
                    }
                    alt={category.name}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      "
                  />

                </div>

                <h3
                  className="
                    mt-4
                    font-semibold
                    text-gray-800
                    group-hover:text-blue-600
                    transition
                  "
                >
                  {category.name}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

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