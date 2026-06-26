import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import { getWishlist, moveToCart, removeFromWishlist } from "../../api/wishlist.api"

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([])
    const [message, setMessage] = useState('')
    const [itemsMoved, setItemsMoved] = useState(false)
    const navigate = useNavigate()

    const fetchWishlist = async () => {
        try {

            const response = await getWishlist()

            console.log(response)

            setWishlist(response.data.products)
        } catch (error) {
            console.log(error);
        }
    }

    const removeHandler = async (productId) => {
        try {
            const response = await removeFromWishlist(productId)

            setMessage(response.message)

            fetchWishlist()
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong')
        }
    }

    const moveToCartHandler = async () => {
        try {
            const response = await moveToCart()

            setMessage(response.message)
            fetchWishlist()
            setItemsMoved(true)

        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong')
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    if (wishlist.length === 0 && itemsMoved) {
        return (
            <div className="min-h-[70vh] flex flex-col justify-center items-center">

                <div className="text-6xl mb-6">
                    🛒
                </div>

                <h1 className="text-3xl font-bold">
                    All wishlist items moved successfully!
                </h1>

                <p className="text-gray-500 mt-3">
                    Your wishlist is now empty.
                </p>

                <div className="flex gap-4 mt-8">

                    <button
                        onClick={() => navigate("/cart")}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        View Cart
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    if (wishlist.length == 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-3xl font-bold mb-6">
                    My Wishlist
                </h1>

                <p className="text-gray-500 mb-6">Your Wishlist is Empty</p>

                <Link
                    to="/"
                    className="bg-blue-500 text-white px-6 py-3 rounded">
                    Browse Products
                </Link>
            </div>
        )
    }
    return (

        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Wishlist
            </h1>

            {
                wishlist.map(product => (

                    <div
                        key={product._id}
                        className="flex items-center justify-between border rounded-lg p-4 mb-4">

                        <div className="flex items-center gap-4">

                            <img
                                src={
                                    product.images?.[0]?.url ||
                                    "https://placehold.co/100x100"
                                }
                                alt={product.name}
                                className="w-20 h-20 rounded object-cover"
                            />

                            <div>
                                <h2 className="font-semibold">
                                    {product.name}
                                </h2>

                                <p>
                                    ₹ {product.price}
                                </p>

                                <p>
                                    {product.stock} left in stock
                                </p>
                            </div>


                        </div>
                        <button
                            onClick={() => removeHandler(product._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                            Remove
                        </button>
                    </div>


                ))
            }
            <div className="sticky bottom-0 left-0 right-0 bg-white shadow-lg p-3 flex">
                <div className="max-w-6xl mx-auto flex items-center justify-between">

                    <button
                        onClick={moveToCartHandler}
                        className="bg-blue-500 text-white px-6 py-3 rounded">
                        Move to Cart
                    </button>

                </div>
            </div>
        </div>
    );
};


export default Wishlist