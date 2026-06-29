import { useState, useEffect } from "react";

import { getAllOrdersAdmin } from "../../api/order.api";

import OrderTable from "../../components/admin/OrderTable";
import OrderDetailsModal from '../../components/admin/OrderDetailsModal'
import OrderStatusModal from '../../components/admin/OrderStatusModal'


const Orders = () => {

    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [orders, setOrders] = useState([])
    const [selectedOrders, setSelectedOrders] = useState(null)
    const [detailsModal, setDetailsModal] = useState(false)
    const [statusModal, setStatusModal] = useState(false)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await getAllOrdersAdmin()
            setOrders(response.data)
            setMessage(response.message)
        } catch (error) {
            setMessage(error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const openDetailsModal = (order) => {
        setDetailsModal(true)
        setSelectedOrders(order)
        // setStatusModal(true)
    }

    const openStatusModal = (order) => {
        setSelectedOrders(order);
        setStatusModal(true);
    };

    const handleStatusUpdated = () => {
        setStatusModal(false);
        setDetailsModal(false);
        setSelectedOrders(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">
                Orders
            </h1>

            <OrderTable
                orders={orders}
                loading={loading}
                onView={openDetailsModal}
            />

            <OrderDetailsModal
                isOpen={detailsModal}
                onClose={() => setDetailsModal(false)}
                order={selectedOrders}
                onUpdateStatus={openStatusModal}
            />

            <OrderStatusModal
                isOpen={statusModal}
                onClose={() => setStatusModal(false)}
                order={selectedOrders}
                onStatusUpdated={handleStatusUpdated}
                fetchOrders={fetchOrders}
            />
        </div>
    )
}

export default Orders