import api from "./axiosInstance";

export const getAllCategories = async() =>{

    const response = await api.get('/category')
    return response.data
}

export const createCategory = async(data) =>{
    const response = await api.post('/category', data)
    return response.data
}