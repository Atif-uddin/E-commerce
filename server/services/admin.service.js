import User from "../models/user.js"
import { generateJwtToken } from "../utils/jwt.js"


export const findAdminByEmail = async(email) =>{
    const admin = await User.findOne({email}).select('-createdAt -updatedAt -__v')
    return admin
}

export const loginAdminService = async(admin) =>{

    const token = generateJwtToken({userId: admin._id, role: admin.role})

    return {
        user : {
            _id : admin._id,
            name: admin.fullname,
            role : admin.role,
            email: admin.email
        },
        token
    }
}