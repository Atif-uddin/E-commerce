import { addToCartService, getCartService } from "../services/cart.service.js"


export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id

        const { productId, quantity } = req.validatedData

        const cart = await addToCartService(userId, productId, quantity)

        return res.status(200).send({
            success: true,
            message: 'Product added to cart!',
            data: cart
        })
    } catch (error) {
        return res.status(error.statusCode || 500).send({
            success: false,
            message: error.message || "Internal server Error"
        })
    }
}


export const getCart = async (req, res) => {
    try {

        const userId = req.user._id;

        const cart = await getCartService(userId);

        return res.status(200).send({
            success: true,
            data: cart
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};