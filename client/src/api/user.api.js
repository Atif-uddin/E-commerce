import api from "./axiosInstance";

export const getUserDetails = async(data) =>{
    
    const response = await api.get('/users/details',data)
    return response.data
}

export const updateUser = async(data) =>{

    const response = await api.put('/users/update', data)
    return response.data
}