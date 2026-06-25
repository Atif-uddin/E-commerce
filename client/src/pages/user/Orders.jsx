import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAllOrders } from "../../api/order.api";

const Orders = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders()

                console.log(response);
                console.log(response.data);

                setOrders(response.data.orders)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrders()
    }, [])

    if (orders.length == 0) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">
                    My Orders
                </h1>

                <p>No Orders Found!</p>
            </div>
        )
    }

    const getStatusColors = (status) => {

        switch (status) {
            case "pending":
                return 'bg-yellow-100 text-yellow-700'

            case "processing":
                return "bg-blue-100 text-blue-700";

            case "shipped":
                return "bg-purple-100 text-purple-700";

            case "delivered":
                return "bg-green-100 text-green-700";

            case "cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }

    };


    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Orders
            </h1>
            {
                orders.map(order => (
                    <div
                        key={order._id}
                        className=" rounded-lg p-4 mb-4 shadow-lg">
                        <Link
                            to={`/orders/${order._id}`}
                            className="block border rounded-lg p-4 mb-4 shadow-sm">

                            <h2 className="font-bold">
                                Order #{order._id.slice(-6)}
                            </h2>

                            <div className="mt-2">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColors(order.orderStatus)}`}>
                                    {order.orderStatus.toUpperCase()}
                                </span>

                            </div>

                            <p>
                                Total: ₹ {order.totalAmount}
                            </p>

                            <p>
                                Items: {order.items.length}
                            </p>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default Orders;

