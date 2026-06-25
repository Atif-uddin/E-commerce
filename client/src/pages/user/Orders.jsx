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

                            <p>
                                Status: {order.orderStatus}
                            </p>

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

