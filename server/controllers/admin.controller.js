import { success } from "zod";
import { getAllUsersService, getDashboardService, loginAdminService } from "../services/admin.service.js";


export const loginAdmin = async(req, res) =>{
    try {
        const admin = await loginAdminService(req.user)

        return res.status(200).send({
            success: true,
            message: 'Admin Login Successfull!',
            data: admin
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const getDashboard = async(req, res) =>{
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


export const getAllUsers = async(req, res) =>{
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