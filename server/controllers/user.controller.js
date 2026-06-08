import { success } from "zod";
import { deleteUserById, updateUser } from "../services/user.service.js";



export const getUserDetails = async(req, res) =>{
    try {
        const {
            fullname,
            email,
            phoneNumber,
            role
        } = req.user
        return res.status(200).send({
            success: true,
            data: {
                fullname,
                email,
                phoneNumber,
                role
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const updateUserDetails = async(req, res) =>{
    try {
        const userId = req.user._id
        const updates = req.validatedData

        const updatedUser = await updateUser(userId, updates)
        return res.status(200).send({
            success: true,
            message: 'Details Updated Successfully!',
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const deleteUser = async(req, res) =>{
    try {
        const userId = req.user._id
        
        await deleteUserById(userId)
        
        res.clearCookie('token')

        return res.status(201).send({
            success: true,
            message: 'Account deleted Successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error '
        })
    }
}