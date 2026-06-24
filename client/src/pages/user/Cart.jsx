import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { getCart } from "../../api/cart.api";
import { updateCartItem } from "../../api/cart.api";
import { removeCartItem } from "../../api/cart.api";
import { clearCart } from "../../api/cart.api";

const Cart = () => {
    const [cart, setCart] = useState(null)

    const fetchCart = async () => {
        try {
            const response = await getCart()
            console.log(response);

            setCart(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    if (!cart || cart.items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">

                <h1 className="text-3xl font-bold mb-4">
                    Your Cart is Empty
                </h1>

                <p className="text-gray-500 mb-6">
                    Looks like you haven't added anything yet.
                </p>

                <Link
                    to="/"
                    className="bg-blue-500 text-white px-6 py-3 rounded">
                    Browse Products
                </Link>

            </div>
        )
    }
    const increaseQuantity = async (item) => {
        try {
            await updateCartItem(
                item.product._id,
                item.quantity + 1
            )
            fetchCart()
        } catch (error) {
            console.log(error)
        }
    }

    const decreaseQuantity = async (item) => {

        if (item.quantity <= 1) return

        try {
            await updateCartItem(
                item.product._id,
                item.quantity - 1
            )
            fetchCart()
        } catch (error) {
            console.log(error)
        }
    }

    const removeItemHandler = async (productId) => {

        try {
            await removeCartItem(productId)
            await fetchCart()
        } catch (error) {
            console.log(error);
        }
    }



    const clearCartHandler = async () => {
        console.log("CLEAR CLICKED")

        const confirmDelete = window.confirm(
            "Are you sure you want to clear the cart?")

        if (!confirmDelete) return

        try {
            await clearCart()

            await fetchCart()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="max-w-6xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-5">
                Cart
            </h1>
            {
                cart.items.map(item => (
                    <div
                        key={item.product._id}
                        className="flex items-center justify-between border p-4 rounded mb-4">

                        <div className="flex items-center gap-4">

                            <img
                                src={item.product.images?.[0]?.url}
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded"
                            />

                            <div>

                                <h2 className="font-semibold gap-2 ">
                                    {item.product.name}
                                </h2>

                                <p>
                                    ₹ {item.price}
                                </p>

                            </div>

                            <div className="flex  items-center gap-3">

                                <button onClick={() => decreaseQuantity(item)} className="border cursor-pointer px-3 py-1 rounded">
                                    -
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button onClick={() => increaseQuantity(item)} className="border cursor-pointer px-3 py-1 rounded">
                                    +
                                </button>

                                <button
                                    onClick={() => removeItemHandler(item.product._id)}
                                    className="bg-black text-white px-3 py-2 cursor-pointer rounded">
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="mt-6 text-xl font-bold flex gap-10">
                Grand Total:
                ₹ {cart.totalAmount}

                <button onClick={clearCartHandler} className="bg-black  p-2 text-white cursor-pointer rounded">
                    <FaTrash size={20} />
                </button>

            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">

                    <div>
                        <p className="text-gray-500">
                            Total Amount
                        </p>

                        <h2 className="text-2xl font-bold">
                            ₹ {cart.totalAmount}
                        </h2>
                    </div>

                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded">
                        Proceed To Checkout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Cart;
