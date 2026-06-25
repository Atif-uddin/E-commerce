import { useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderById } from "../../api/order.api";
import { useEffect } from "react";

const OrderDetails = () => {

    const [order, setOrder] = useState(null)

    const { orderId } = useParams()

    useEffect(() => {
        const fetchOrder = async () => {
            
            try {
                const response = await getOrderById(orderId)
                console.log(response);
                console.log("ORDER:", response.data);
                setOrder(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrder()
    }, [orderId])
    
    console.log(order);
    if (!order) {

        return (
            <div className="max-w-5xl mx-auto p-6">
                Loading Order...
            </div>
        );

    }

    return (

        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Order Details
            </h1>

            <div className="border rounded-lg p-5 shadow-sm mb-6">

                <p>
                    <strong>Order ID:</strong> {order._id}
                </p>

                <p>
                    <strong>Order Status:</strong> {order.orderStatus}
                </p>

                <p>
                    <strong>Payment Status:</strong> {order.paymentStatus}
                </p>

                <p>
                    <strong>Placed On:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                </p>

            </div>

            <div className="border rounded-lg p-5 shadow-sm mb-6">

                <h2 className="text-xl font-bold mb-3">
                    Shipping Address
                </h2>

                <p>
                    {order.shippingAddress}
                </p>

            </div>

            <div className="border rounded-lg shadow-sm mb-6">

                <h2 className="text-xl font-bold mb-4 p-3 mt-3">
                    Ordered Products
                </h2>

                {
                    order.items.map(item => (

                        <div
                            key={item.product._id}
                            className="flex items-center gap-4 border-b py-4">

                            <img
                                src={item.product.images?.[0]?.url}
                                alt={item.product.name}
                                className="w-20 h-20 rounded object-cover"
                            />

                            <div className="flex-1">

                                <h3 className="font-semibold">
                                    {item.product.name}
                                </h3>

                                <p>
                                    Quantity: {item.quantity}
                                </p>

                                <p>
                                    ₹ {item.price}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="border rounded-lg p-5 shadow-sm">

                <h2 className="text-2xl font-bold">

                    Grand Total:
                    <span className="ml-2">
                        ₹ {order.totalAmount}
                    </span>
                </h2>
            </div>
        </div>
    );
};

export default OrderDetails;
