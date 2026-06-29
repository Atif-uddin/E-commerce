import api from "./axiosInstance";

export const AdminLogout = async () => {
    const response = await api.delete('/admin/logout')
    return response.data
}

export const getDashboard = async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
}

export const getAllUsers = async () => {
    const response = await api.get('/admin/users')
    return response.data
}

export const getUserById = async (userId) => {
    const response = await api.get(`/admin/users/${userId}`)
    return response.data
}

export const updateUserById = async (userId, data) => {
    const response = await api.put(`/admin/users/${userId}`, data)
    return response.data
}

export const deleteUser = async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`)
    return response.data
}