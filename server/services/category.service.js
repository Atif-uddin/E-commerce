import Category from "../models/category.js"
import slugify from 'slugify'

export const findCategoryById = async(id) =>{
    const category = await Category.findById(id)
    return category
}

export const createCategoryService = async(data) =>{
    const {name} = data
    const category = await Category.create({...data, slug: slugify(name,{lower: true, strict: true})})
    return category
}

export const findCategoryByName = async(name) =>{
    const category = await Category.findOne({name: name.trim()})
    return category
}

export const getAllCategoryService = async() =>{
    const categories = await Category.find({isActive: true}).select('__v')
    return categories
}