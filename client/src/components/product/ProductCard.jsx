import { Link } from "react-router-dom";
import { addToWishlist } from "../../api/wishlist.api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

    const navigate = useNavigate()

    return (
        <div className="border rounded-lg p-4 shadow">
            <img src={product.images?.[0]?.url}
                alt={product.images?.[0]?.url || product.name}
                className="w-fit h-48 object-cover rounded"
            />

            <h2 className="font-bold text-lg mt-3">
                {product.name}
            </h2>

            <p className="text-gray-600">
                {product.brand}
            </p>

            <p className="font-bold text-green-600">
                ₹ {product.price}
            </p>

            <p> {product.stock} left in stock</p>

            <Link to={`/products/${product._id}`}
                className="inline-block mt-3 bg-blue-500 text-white px-3 py-2 rounded">
                Buy now
            </Link>
        </div>
    )
}

export default ProductCard