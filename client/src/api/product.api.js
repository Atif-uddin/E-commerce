import api from "./axiosInstance";

export const getAllProducts = async (params = {}, category) => {
    const response = await api.get('/products', { params }, category)
    return response.data
}

export const getProductById = async (productId) => {
    const response = await api.get(`/products/${productId}`)
    return response.data
}

export const createProduct = async (data) => {
    const response = await api.post('/products', data)
    return response.data
}

export const updateProduct = async (productId, data) => {
    const response = await api.put(`/products/${productId}`, data);
    return response.data;
}

export const deleteProduct = async (productId) => {
    const response = await api.delete(`/products/delete/${productId}`);
    return response.data;
}