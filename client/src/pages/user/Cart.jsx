import { useState, useEffect } from "react";
import { getCart } from "../../api/cart.api";

const Cart = () =>{
    const [cart, setCart] = useState(null)

    useEffect(() =>{
        const fetchCart = async() =>{
            try {
                const response = await getCart()
                console.log(response);

                setCart(response.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchCart()
    },[])

    if(!cart){
        return <h1>Your Cart is Empty</h1>
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
                        className="border p-4 mb-4 rounded">

                        <h2>{item.product.name}</h2>

                        <p>₹ {item.price}</p>

                        <p>Qty: {item.quantity}</p>

                        <p>
                            Total:
                            ₹ {item.price * item.quantity}
                        </p>

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
