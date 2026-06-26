import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

import { getProductById } from "../../api/product.api";
import { addToCart } from "../../api/cart.api";
import { addToWishlist } from "../../api/wishlist.api";

const ProductDetails = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

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

    const addToWishlistHandler = async () => {
        try {
            const response = await addToWishlist(product._id);
            setMessage(response.message)
        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }
            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

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

                <div>

                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>

                    <p className="text-gray-600 mt-2">
                        {product.brand}
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-4">
                        ₹ {product.price}
                    </p>

                    <p className="mt-4">
                        Stock: {product.stock} left in stock
                    </p>

                    <p className="mt-4">
                        Rating: {product.rating}
                    </p>

                    <p className="mt-6">
                        {product.description}
                    </p>

                    <button
                        onClick={addToCartHandler}
                        className="mt-6 bg-blue-500 text-white px-5 py-3 rounded">
                        Add To Cart
                    </button>

                    <button
                        onClick={addToWishlistHandler}
                        className=" top-2 right-2 bg-white rounded-full p-2 shadow hover:scale-110 transition cursor-pointer">
                        <FaHeart className="text-red-500" />
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

        </div>
    );
};

export default ProductDetails;