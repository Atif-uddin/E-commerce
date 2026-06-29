import { useEffect, useState } from "react";
import { updateOrderStatus } from "../../api/order.api";

const OrderStatusModal = ({ isOpen, onClose, order, fetchOrders, onStatusUpdated }) => {

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

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
            const response = await updateOrderStatus(
                order._id, { orderStatus: status }
            );
            setMessage(response.message || 'Order Status updated Successfully!')
            await fetchOrders();

            setTimeout(() =>{
                setMessage('')
                onStatusUpdated()
            },2000)

        } catch (error) {
            setError(error.response?.data?.message || 'Something went Wrong');

            setTimeout(() =>{
                setError('')
            },2000)
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
                        className="text-3xl font-bold">
                        ×
                    </button>
                </div>

                {message && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                        <p className="text-green-700 font-medium">
                            {message}
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-red-700 font-medium">
                            {error}
                        </p>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6">
                    <div>
                        <label className="block mb-2 font-medium">
                            Current Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3">

                            <option value="pending">
                                Pending
                            </option>

                            <option value="processing">
                                Processing
                            </option>

                            <option value="shipped">
                                Shipped
                            </option>

                            <option value="delivered">
                                Delivered
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
                            className="border px-5 py-2 rounded-lg">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
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