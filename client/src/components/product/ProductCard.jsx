import { Link } from "react-router-dom";
import { addToWishlist } from "../../api/wishlist.api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import useWishlistHook from "../../hooks/useWishlist";

const ProductCard = ({ product }) => {

    const navigate = useNavigate()
    const { addToWishlistHandler, isWishlisted } = useWishlistHook()

    return (
        <div className=" p-3 group
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                border border-gray-100"
        >
            <div className="relative  h-72 overflow-hidden">

                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="
                    w-full
                    h-full
                    object-contain
                    group-hover:scale-110
                    transition-transform
                    duration-500
                "
                />

                {/* Wishlist */}

                <button
                    onClick={() => addToWishlistHandler(product._id)}
                    className="
                        absolute
                        top-4
                        right-4
                        bg-white
                        p-2
                        rounded-full
                        shadow-lg
                        hover:text-white
                        transition
                        cursor-pointer
                    "
                >
                    <Heart
                        className={`w-5 h-5 ${isWishlisted
                            ? "text-red-500"
                            : "text-gray-500"
                            }`}
                        fill={isWishlisted ? "currentColor" : "none"}
                    />
                </button>

            </div>

            <h2 className="font-bold mt-3 text-xl text-gray-900 group-hover:text-blue-600 transition"
            >
                {product.name}
            </h2>

            <p className="text-sm text-gray-500 uppercase tracking-wide">
                {product.brand}
            </p>

            <p className="font-bold text-green-600">
                ₹ {product.price}
            </p>

            <div className="flex items-center mt-1">

                <span className="text-yellow-400">
                    ★★★★★
                </span>

                <span className="ml-2 text-sm text-gray-500">
                    4.8
                </span>

            </div>

            <p> {product.stock} left in stock</p>

            <Link to={`/products/${product._id}`}
                className="inline-block mt-3 bg-blue-500 text-white px-3 py-2 rounded">
                Buy now
            </Link>
        </div >
    )
}

export default ProductCard