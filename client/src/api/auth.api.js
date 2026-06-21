import api from "./axiosInstance";

export const registerUser = async(data) =>{
    const response = await api.post('/users/register',data)
    return response.data
}

export const loginUser = async(data) =>{
    const response = await api.post('/users/login',data)
    return response.data
}

export const verifyEmail = async(data) =>{
    const response = await api.post('/users/verify-email',data)
    return response.data
}