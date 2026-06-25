import { useState, useEffect } from "react";

import { getAllProducts } from "../../api/product.api";
import ProductCard from "../../components/product/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts()
        console.log(response);
        setProducts(response.data || [])
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if(loading){
    return <h1>Loading Products...</h1>
  }

  return(
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {
          products.map(product =>(
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Home