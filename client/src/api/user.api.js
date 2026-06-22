import api from "./axiosInstance";

export const getUserDetails = async() =>{
    
    const response = await api.get('/users/details')
    return response.data
}