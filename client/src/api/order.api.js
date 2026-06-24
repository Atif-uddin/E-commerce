import api from "./axiosInstance"


export const createOrder = async(shippingAddress) =>{
    const response = await api.post('/orders',{shippingAddress})
    return response.data
}

export const getAllOrders = async() =>{
    const response = await api.get('/orders')
    return response.data
}