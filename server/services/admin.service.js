import Order from "../models/order.js"
import Product from "../models/product.js"
import User from "../models/user.js"
import { generateJwtToken } from "../utils/jwt.js"


export const findAdminByEmail = async (email) => {
    const admin = await User.findOne({ email }).select('-createdAt -updatedAt -__v')
    return admin
}

export const loginAdminService = async (admin) => {

    const token = generateJwtToken({ userId: admin._id, role: admin.role })

    return {
        user: {
            _id: admin._id,
            name: admin.fullname,
            role: admin.role,
            email: admin.email
        },
        token
    }
}

export const getDashboardService = async () => {

    const totalUsers = await User.countDocuments({ role: 'user' })

    const totalProducts = await Product.countDocuments()

    const totalOrders = await Order.countDocuments()

    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' })

    const revenueData = await Order.aggregate([
        {
            $match: {
                paymentStatus: 'paid'
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: '$totalAmount'
                }
            }
        }
    ])
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0

    return{
        totalUsers,
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue
    }
}

