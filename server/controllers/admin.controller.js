import { success } from "zod";
import { deleteUserService, getAllUsersService, getDashboardService, getUserByIdService, loginAdminService, updateUserService } from "../services/admin.service.js";
import { cookieConfig } from "../config/cookie.config.js";


export const loginAdmin = async (req, res) => {
    try {
        const admin = req.user;

        const { user, token } = await loginAdminService(admin);

        res.cookie('adminToken', token, cookieConfig);

        return res.status(200).send({
            success: true,
            message: 'Admin Login Successful!',
            data: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const getDashboard = async (req, res) => {
    try {
        const dashboard = await getDashboardService()

        return res.status(200).send({
            success: false,
            data: dashboard
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService()

        return res.status(200).send({
            success: true,
            data: users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}


export const getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(req.targetUser)

        return res.status(200).send({
            success: true,
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const updateUserById = async (req, res) => {
    try {
        const updateStatus = req.validatedData.status
        const updatedUser = await updateUserService(req.targetUser, updateStatus)

        return res.status(200).send({
            success: true,
            message: 'User updated Successfully!',
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUserService(req.targetUser)

        return res.status(200).send({
            success: true,
            message: 'User deleted Successfully!',
            data: deletedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const AdminLogout = async (req, res) => {
    try {

        res.clearCookie('adminToken', cookieConfig);

        return res.status(200).send({
            success: true,
            message: 'Admin logged out successfully!'
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};