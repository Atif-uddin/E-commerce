import { useEffect, useState } from "react";
import { updateOrderStatus } from "../../api/order.api";

const OrderStatusModal = ({
    isOpen,
    onClose,
    order,
    fetchOrders
}) => {

    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState("");

    useEffect(() => {

        if (order) {
            setStatus(order.orderStatus);
        }

    }, [order]);

    if (!isOpen || !order) return null;

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await updateOrderStatus(
                order._id,
                {
                    orderStatus: status
                }
            );

            fetchOrders();

            onClose();

        } catch (error) {

            console.log(error.response?.data);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-full max-w-md p-6">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        Update Order Status

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl font-bold"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label className="block mb-2 font-medium">

                            Current Status

                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3"
                        >

                            <option value="pending">
                                Pending
                            </option>

                            <option value="processing">
                                Processing
                            </option>

                            <option value="shipped">
                                Shipped
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                            <option value="cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >

                            {
                                loading
                                    ? "Updating..."
                                    : "Update Status"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default OrderStatusModal;