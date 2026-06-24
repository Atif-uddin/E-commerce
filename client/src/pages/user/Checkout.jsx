import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../../api/order.api";
import { getCart } from "../../api/cart.api";


const Checkout = () => {

    const [shippingAddress, setShippingAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState(null)
    const [alert, setAlert] = useState({
        message: '',
        type: ''
    })
    const navigate = useNavigate()

    const placeOrderHandler = async () => {

        if (!shippingAddress.trim()) {
            setAlert({
                message: 'Shipping Adress is required!',
                type: 'error'
            })
            return
        }
        try {
            setLoading(true)

            const response = await createOrder(shippingAddress)

            setAlert({
                message: response.message,
                type: 'success'
            })
            setTimeout(() => {
                navigate('/orders')
            }, 1500)
        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log("ERROR RESPONSE:", error.response);
            console.log("ERROR DATA:", error.response?.data);
            setAlert({
                message: error.response?.data?.message || 'Something Went Wrong',
                type: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCart()
                console.log(response);
                setCart(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCart()
    }, [])

    if (!cart) {
        return <h1>Loading...</h1>
    }

    const subtotal = cart?.totalAmount || 0;

    const gst = Math.round(subtotal * 0.18);

    const deliveryCharge = subtotal > 1000 ? 0 : 50;

    const handlingFee = 20;

    const finalTotal =
        subtotal +
        gst +
        deliveryCharge +
        handlingFee;

    return (

        < div className="max-w-3xl mx-auto p-6" >
            <h1 className="text-3xl font-bold mb-6 mt-5">
                Checkout
            </h1>
            {
                cart?.items.map(item => (

                    <div
                        key={item.product._id}
                        className="flex items-center gap-4 border-b py-4">

                        <img
                            src={item.product.images?.[0]?.url}
                            alt={item.product.name}
                            className="w-16 h-16 rounded object-cover" />

                        <div>

                            <h3 className="font-semibold">
                                {item.product.name}
                            </h3>

                            <p>
                                Qty: {item.quantity}
                            </p>

                            <p>
                                ₹ {item.price}
                            </p>
                        </div>
                    </div>

                ))
            }



            <div className="flex flex-col gap-5">



                <div className="mt-8 border rounded-lg p-5 shadow-sm">

                    <h2 className="text-xl font-bold mb-4">
                        Bill Summary
                    </h2>

                    <div className="space-y-2">

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹ {subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>GST (18%)</span>
                            <span>₹ {gst}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery Charges</span>
                            <span>
                                {
                                    deliveryCharge === 0
                                        ? "FREE"
                                        : `₹ ${deliveryCharge}`
                                }
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Handling Fee</span>
                            <span>₹ {handlingFee}</span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-lg font-bold">

                            <span>Grand Total</span>

                            <span>
                                ₹ {finalTotal}
                            </span>

                        </div>

                    </div>

                </div>
                {<label className="block text-lg font-semibold">
                    Shipping Address
                </label>}
                {
                    alert.message && (
                        <p className={
                            alert.type === "success"
                                ? "text-green-500 mb-4"
                                : "text-red-500 "
                        }> {alert.message}
                        </p>
                    )
                }

                <textarea
                    rows={5}
                    value={shippingAddress}
                    onChange={(e) =>
                        setShippingAddress(e.target.value)
                    }
                    placeholder="Enter your complete shipping address..."
                    className="w-full border rounded p-3 resize-none" />

                <button
                    onClick={placeOrderHandler}
                    disabled={loading}
                    className="mt-5 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                    {
                        loading
                            ? "Placing Order..."
                            : "Place Order"
                    }
                </button>
            </div>
        </div >
    );
};

export default Checkout;

