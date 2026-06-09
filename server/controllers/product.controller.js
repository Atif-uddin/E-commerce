import { success } from "zod";
import { createProductService, getAllProductsService } from "../services/products.service.js";


export const getAllProducts = async(req, res) =>{
    try {
        const filters = req.validatedData 
        const result = await getAllProductsService(filters)

        console.log(filters);

        if(result.products.length == 0){
            return res.status(200).send({
                success: true,
                message: 'No products available at this time!'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Products Fetched Successfully',
            data: result.products,
            pagination: result.pagination
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}


export const createProduct = async (req, res) => {
    try {

        const product = await createProductService(req.validatedData);

        return res.status(201).send({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        console.log(error.message);

        return res.status(400).send({
            success: false,
            message: error.message || "Failed to create product"
        });
    }
};