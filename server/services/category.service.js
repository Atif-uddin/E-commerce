import Category from "../models/category.js"
import slugify from 'slugify'

export const findCategoryById = async (id) => {
    const category = await Category.findById(id).select('-__v')
    return category
}

export const createCategoryService = async (data) => {
    const { name } = data
    const category = await Category.create({ ...data, slug: slugify(name, { lower: true, strict: true }) })
    return category
}

export const findCategoryByName = async (name) => {
    const category = await Category.findOne({ name: name.trim() })
    return category
}

export const getAllCategoryService = async () => {
    const categories = await Category.find({ isActive: true }).select('-__v')
    console.log(categories);

    return categories
}

export const findCategoryByCategoryId = async (categoryId) => {
    console.log("received:", categoryId);
    console.log("type:", typeof categoryId);
    const category = await Category.findById(categoryId).select('-__v')
    console.log("result:", category);
    return category
}

export const updateCategoryService = async (categoryId, updateData) => {

    if (updateData.name) {
        updateData.slug = slugify(updateData.name, { lower: true, strict: true });
    }
    const updatedCategory = await Category.findByIdAndUpdate(categoryId,updateData,{returnDocument: "after"}).select("-__v");

    return updatedCategory;
}

export const deleteCategoryService = async(categoryId) =>{
    const category = await Category.findByIdAndUpdate(categoryId, {isActive: false},{returnDocument: "after"})


}