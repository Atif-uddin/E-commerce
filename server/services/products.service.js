import Product from "../models/product.js";
import Category from "../models/category.js";
import slugify from 'slugify'

export const getAllProductsService = async (filters) => {

    const {
        page = 1,
        limit = 10,
        search,
        category,
        minPrice,
        maxPrice,
        sort
    } = filters;

    let query = { isActive: true };

    // search
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    // category filter
    if (category) {
        query.category = category;
    }

    // price filter
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
    }

    // sorting
    let sortOption = {};

    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "newest") sortOption.createdAt = -1;
    if (sort === "oldest") sortOption.createdAt = 1;

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
        .populate("category", "name slug")
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    return {
        products,
        pagination: {
            totalProducts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit)
        }
    };
};

export const createProductService = async (data) => {

    const {name} = data
    // Create product with slug
    const product = await Product.create({
        ...data,
        slug: slugify(name, { lower: true, strict: true })
    });

    return product;
};

export const findProductByNameAndCategory =async(name, category) =>{
    const product = await Product.findOne({name, category})
    return product
}