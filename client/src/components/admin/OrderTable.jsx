const OrderTable = ({ orders, loading, onView }) => {

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <h2 className="text-lg font-semibold">
                    Loading Orders...
                </h2>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold">
                    No Orders Found
                </h2>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">
                    <tr>

                        <th className="text-left p-4">Image</th>

                        <th className="text-left p-4">Customer</th>

                        <th className="text-left p-4">Items</th>

                        <th className="text-left p-4">Amount</th>

                        <th className="text-left p-4">Payment</th>

                        <th className="text-left p-4">Status</th>

                        <th className="text-left p-4">Shipping</th>

                        <th className="text-center p-4">Actions</th>

                    </tr>
                </thead>

                <tbody>

                    {orders.map(order => {
                        console.log(order.user);
                        return( 
                        
                    <tr
                        key={order._id}
                        className="border-t hover:bg-gray-50 transition"
                    >

                        <td className="p-4">

                            <img
                                src={
                                    order.items?.[0]?.product?.images?.[0]?.url ||
                                    "https://placehold.co/60x60"
                                }
                                alt={order.items?.[0]?.product?.name}
                                className="w-14 h-14 rounded-lg object-cover"
                            />

                        </td>

                        <td className="p-4">

                            <p className="font-semibold">
                                {order.user?.fullname || 'Unknown User'}
                            </p>

                            <p className="text-sm text-gray-500">
                                {order.user?.email || '-'}
                            </p>

                        </td>

                        <td className="p-4">

                            {order.items.length} Item(s)

                        </td>

                        <td className="p-4 font-semibold">

                            ₹ {order.totalAmount}

                        </td>

                        <td className="p-4">

                            <span
                                className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                        ${order.paymentStatus === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }
                                        `}
                            >
                                {order.paymentStatus}
                            </span>

                        </td>

                        <td className="p-4">

                            <span
                                className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                        ${order.orderStatus === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                    }
                                        `}
                            >
                                {order.orderStatus}
                            </span>

                        </td>

                        <td className="p-4">

                            {order.shippingAddress}

                        </td>

                        <td className="p-4">

                            <div className="flex justify-center">

                                <button
                                    onClick={() => onView(order)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                >
                                    View
                                </button>

                            </div>

                        </td>

                    </tr>
                    )
                    })}


                </tbody>

            </table>

        </div>
    );
};

export default OrderTable;