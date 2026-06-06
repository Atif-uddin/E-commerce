import { createUser } from "../services/user.service.js";
import { validateRegistrationOtp } from "../services/auth.service.js";


export const registerUser = async (req, res) => {
    const { fullname, email, password, phoneNumber } = req.user
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

    const { email, otp } = req.user || {}
    // console.log(email, otp);
    // console.log(otp, typeof otp);
    
    console.log(req.user);
    console.log('test');
    
    

    if (!email) {
        return res.status(400).send({
            success: false,
            message: 'Email is required'
        })
    }
    if (!otp) {
        return res.status(400).send({
            success: false,
            message: 'OTP is required'
        })
    }

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