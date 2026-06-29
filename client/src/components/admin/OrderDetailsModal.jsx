

const OrderDetailsModal = ({ isOpen, onClose, order, onUpdateStatus }) => {

    if (!isOpen || !order) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">
                        Order Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl font-bold">
                        ×
                    </button>
                </div>

                <div className="gird grid-cols-2 gap-6 mb-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-3">
                            Customer
                        </h3>

                        <p>
                            <strong>Name:</strong> {order.user.fullname}
                        </p>

                        <p>
                            <strong>Email:</strong> {order.user.email}
                        </p>

                        <p>
                            <strong>Phone:</strong> {order.user.phoneNumber}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-3">
                            Shipping
                        </h3>

                        <p>
                            {order.shippingAddress}
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-4">
                        Ordered Products
                    </h3>

                    <div className="space-y-4">

                        {
                            order.items.map((item) => (

                                <div
                                    key={item.product._id}
                                    className="flex items-center justify-between border rounded-lg p-4"
                                >

                                    <div className="flex gap-4 items-center">

                                        <img
                                            src={item.product.images[0]?.url}
                                            alt={item.product.name}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />

                                        <div>

                                            <h4 className="font-semibold">
                                                {item.product.name}
                                            </h4>

                                            <p>
                                                ₹ {item.product.price}
                                            </p>

                                            <p>
                                                Qty : {item.quantity}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="font-bold text-lg">

                                        ₹ {item.price * item.quantity}

                                    </div>

                                </div>

                            ))
                        }

                    </div>
                </div>

                <div className="space-y-4">

                    {
                        order.items.map((item) => (

                            <div
                                key={item.product._id}
                                className="flex items-center justify-between border rounded-lg p-4"
                            >

                                <div className="flex gap-4 items-center">

                                    <img
                                        src={item.product.images[0]?.url}
                                        alt={item.product.name}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />

                                    <div>

                                        <h4 className="font-semibold">
                                            {item.product.name}
                                        </h4>

                                        <p>
                                            ₹ {item.product.price}
                                        </p>

                                        <p>
                                            Qty : {item.quantity}
                                        </p>

                                    </div>

                                </div>

                                <div className="font-bold text-lg">

                                    ₹ {item.price * item.quantity}

                                </div>

                            </div>

                        ))
                    }

                </div>

                <div>

                    <h4 className="font-semibold">
                        Payment Status
                    </h4>

                    <span
                        className={`
                                inline-block
                                mt-2
                                px-3
                                py-1
                                rounded-full
                                ${order.paymentStatus === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                            `}
                    >

                        {order.paymentStatus}

                    </span>

                </div>

                <div>

                    <h4 className="font-semibold">
                        Payment Status
                    </h4>

                    <span
                        className={`
                                inline-block
                                mt-2
                                px-3
                                py-1
                                rounded-full
                                ${order.paymentStatus === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                            `}
                    >

                        {order.paymentStatus}

                    </span>

                </div>
            </div>
            {/* Footer */}

            <div className="flex justify-end gap-4">

                <button
                    onClick={onClose}
                    className="border px-5 py-2 rounded-lg"
                >
                    Close
                </button>

                <button
                    onClick={onUpdateStatus}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    Update Status
                </button>

            </div>
        </div>
    )
}

export default OrderDetailsModal