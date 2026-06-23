import { useState, useEffect } from "react";
import { getCart } from "../../api/cart.api";

import { updateCartItem } from "../../api/cart.api";

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
       
    useEffect(() =>{
        fetchCart()
    },[])
    

    if (!cart) {
        return <h1>Your Cart is Empty</h1>
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

    return (
        <div className="max-w-6xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-5">
                Cart
            </h1>

            {
                cart.items.map(item => (

                    <div
                        key={item.product._id}
                        className="flex items-center justify-between border p-4 rounded mb-4"
                    >

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

                                <button onClick={() => decreaseQuantity(item)} className="border px-3 py-1">
                                    -
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button onClick={() => increaseQuantity(item)} className="border px-3 py-1">
                                    +
                                </button>

                            </div>

                        </div>

                    </div>

                ))
            }

            <div className="mt-6 text-xl font-bold">

                Grand Total:

                ₹ {cart.totalAmount}

            </div>

        </div>
    );
};

export default Cart;
