import { createUser, findUserByEmail } from "../services/user.service.js";
import { generateResetPasswordOtp, resetPasswordService, validateRegistrationOtp } from "../services/auth.service.js";
import { generateOtp } from "../utils/otp.js";
import { sendOtp } from "../services/email.service.js";
import { generateJwtToken } from "../utils/jwt.js";
import { cookieConfig } from "../config/cookie.config.js";
import { success } from "zod";


export const registerUser = async (req, res) => {
    const { fullname, email, password, phoneNumber } = req.validatedData
    try {
        const user = await createUser({ fullname, email, password, phoneNumber })
        return res.status(200).send({
            success: true,
            message: 'Registration Successfull !'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })

    }
}

export const verifyEmail = async (req, res) => {

    const { email, otp } = req.validatedData || {}
    // console.log(email, otp);
    // console.log(otp, typeof otp);
    
    console.log(req.user);
    console.log('test');
    

    try {
        const {success, message} = await validateRegistrationOtp(email, otp)
        
        if(success){
            return res.status(201).send({
                success: true,
                message
            })
        }else{
            return res.status(400).send({
                success: false,
                message
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const resendOtp = async(req, res) =>{
    const {email} = req.validatedData || {}
   
    try {
        const user = await findUserByEmail(email)

        if(user && user.status == "pending"){
            user.authTokens.userRegistration.otp = generateOtp()
            user.authTokens.userRegistration.expires = new Date(Date.now() + 1 * 60 * 1000).toISOString()
            await user.save()

            await sendOtp(email, user.authTokens.userRegistration.otp)
            return res.status(201).send({
                success: true,
                message: 'OTP sent Successfully'
            })
        }else if(user){
            return res.status(400).send({
                success: false,
                message: 'User already verified'
            })
        }else{
            return res.status(500).send({
                success: false,
                message: 'User not Found!'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const userLogin = async(req, res) =>{
    const user = req.user
    console.log(user);
    console.log(user._id);
    
    const token = await generateJwtToken(user._id)
    // console.log(token);

    res.cookie('token', token, cookieConfig)
    return res.status(201).send({
        success: true,
        message: 'Login Successful!',
        data: user
    })
}

export const forgotPassword = async(req, res) =>{
    try {
        const {email} = req.validatedData 
        console.log(email);
        
        await generateResetPasswordOtp()
        return res.status(201).send({
            success: true,
            message: 'OTP sent Successfully!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const resetPassword = async(req, res) =>{
    try {
        const {email, otp, password} = req.validatedData || {}

        const result = await resetPasswordService({email, otp, password})
        if(!result.success){
            return res.status(400).send(result)
        }
        return res.status(200).send({
            success: true,
            message: 'Password reset Successfull!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const logoutUser = async(req, res) =>{
    try {
        res.clearCookie('token')

        return res.status(200).send({
            success: true,
            message: 'Logout successfully!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}