import { success } from "zod";
import { findAdminByEmail } from "../services/admin.service.js";
import { comparePassword } from "../utils/bcrypt.js";
import { findUserById } from "../services/user.service.js";


export const adminLoginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.validatedData

        const user = await findAdminByEmail(email)
        // console.log("EMAIL:", email);
        // console.log("USER:", user);
        // console.log("ROLE:", user?.role);
        // console.log("PASSWORD FROM DB:", user?.password);

        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Email or password!'
            })
        }
        if (user.role != 'admin') {
            return res.status(400).send({
                success: false,
                message: 'Access Denied! Admins only.'
            })
        }

        const isPasswordValid = await comparePassword(password, user.password)
        console.log("ENTERED PASSWORD:", password);
        console.log("PASSWORD MATCH:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Password! || Invalid Credentials!'
            })
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}


export const getUserByIdMiddleware = async(req, res, next) =>{
    try {
        const {userId} = req.validatedParams

        const user = await findUserById(userId)

        if(!user){
            return res.status(400).send({
                success: false,
                message: 'User not Found!'
            })
        }
        req.targetUser = user
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}


export const updateUserByIdMiddleware = async(req, res, next) =>{
    try {
        const {userId} = req.validatedParams

        const user = await findUserById(userId)

        if(!user){
            return res.status(400).send({
                success: false,
                message: 'User not Found!'
            })
        }
        if(user.role == 'admin'){
            return res.status(400).send({
                success: false,
                message: 'Admin cannot be updated'
            })
        }
        req.targetUser = user
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}