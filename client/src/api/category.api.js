import api from "./axiosInstance";

export const getAllCategories = async() =>{

    const response = await api.get('/category')
    return response.data
}