import api from "./axiosInstance"


export const createOrder = async(shippingAddress) =>{
    const response = await api.post('/orders',{shippingAddress})
    return response.data
}

export const getAllOrders = async() =>{
    const response = await api.get('/orders')
    return response.data
}

export const getOrderById = async(orderId) =>{
    const response = await api.get(`/orders/${orderId}`)
    return response.data
}

export const cancelOrder = async(orderId) =>{
    const response = await api.put(`/orders/${orderId}/cancel`)
    return response.data
}

export const getAllOrdersAdmin = async(params) =>{
    const response = await api.get('/orders/admin/all',{params})
    return response.data
}

export const updateOrderStatus = async(orderId, data) =>{
    const response = await api.put(`/orders/admin/${orderId}/status`, data)
    return response.data
}