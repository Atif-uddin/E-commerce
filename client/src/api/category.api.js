import api from "./axiosInstance";

export const getAllCategories = async() =>{

    const response = await api.get('/category')
    return response.data
}

export const createCategory = async(data) =>{
    const response = await api.post('/category', data)
    return response.data
}

export const updateCategory = async(categoryId, data) =>{
    const response = await api.put(`/category/${categoryId}`,data)
    return response.data
}

export const deleteCategory = async(categoryId) =>{
    const response = await api.delete(`/category/delete/${categoryId}`)
    return response.data
}