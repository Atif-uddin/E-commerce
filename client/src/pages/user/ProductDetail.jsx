import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import { getProductById } from "../../api/product.api";
import { addToCart } from "../../api/cart.api";
import { useWishlist } from "../../context/WishlistContext";
import useWishlistHook from "../../hooks/useWishlist";

const ProductDetails = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { fetchWishlistCount } = useWishlist()
    const {addToWishlistHandler, isWishlisted} = useWishlistHook()

    const { user } = useAuth()

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await getProductById(productId);

                console.log(response);

                setProduct(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchProduct();

    }, [productId]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!product) {
        return <h1>Product Not Found</h1>;
    }

    const addToCartHandler = async () => {
        if (!user) {
            navigate('/login', {
                state: {
                    from: `/products/${product._id}`
                }
            });
            return;
        }
        try {
            const response = await addToCart({
                productId: product._id,
                quantity: 1
            })
            console.log(productId);

            console.log(response);
            setMessage(response.message)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-5">

            <div className="grid md:grid-cols-2 gap-10">

                <div>
                    <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="w-full rounded-lg"
                    />
                </div>

                <div className="p-10">
                    <button
                        onClick={() => addToWishlistHandler(product._id)}
                        className="top-4 right-4 bg-white/90 rounded-full p-2 shadow-md 
                            hover:scale-110 transition-all duration-300 hover:text-white cursor-pointer">
                        <Heart
                            className={`w-5 h-5 ${isWishlisted
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                            fill={isWishlisted ? "currentColor" : "none"}
                        />
                    </button>

                    <h1 className="text-3xl mt-5 font-bold text-gray-900 group-hover:text-blue-600 transition">
                        {product.name}
                    </h1>

                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {product.brand}
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-4">
                        ₹ {product.price}
                    </p>

                    <p className="mt-4">
                        Stock: {product.stock} left in stock
                    </p>

                    <div className="flex items-center mt-4">

                        <span className="text-yellow-400 text-3xl">

                            ★★★★★

                        </span>

                        <span className="ml-2 text-md text-gray-500">

                            {product.rating || 4.8}

                        </span>

                    </div>

                    <p className="mt-6 text-gray-500 text-sm line-clamp-2">
                        {product.description}
                    </p>

                    <button
                        onClick={addToCartHandler}
                        className="px-5 w-full mt-6 py-3 rounded-xl bg-blue-600 
                            hover:bg-blue-700 text-white font-semibold transition"
                    >
                        Add To Cart
                    </button>


                    {
                        message && (
                            <p className="text-green-500">
                                {message}
                            </p>
                        )
                    }

                </div>

            </div>

        </div >
    );
};

export default ProductDetails;