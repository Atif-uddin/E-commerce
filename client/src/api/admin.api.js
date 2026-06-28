import api from "./axiosInstance";

export const AdminLogout = async () =>{
    const response = await api.delete('/admin/logout')
    return response.data
}

export const getDashboard = async() =>{
    const response = await api.get('/admin/dashboard')
    return response.data
}