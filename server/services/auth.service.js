import { email } from "zod"
import User from "../models/user.js"
import { comparePassword } from "../utils/bcrypt.js"
import { generateOtp } from "../utils/otp.js"
import { sendOtp } from "./email.service.js"



export const validatePassword = async(userId, password)=>{
    const user = await User.findById(userId)
    const isValid = await comparePassword(password, user.password)
    return isValid
}

export const validateRegistrationOtp = async(email, otp) =>{
    const user = await User.findOne({email})
    console.log('atif');
    
    if(user && user.status == 'pending'){
        if(user.authTokens.userRegistration.otp == otp){
            const expiry = new Date(user.authTokens.userRegistration.expires)
            if(expiry.getTime() < Date.now()){
                return{
                    success: false,
                    message: 'OTP Invalid or Expired !'
                }
            }
            user.status = 'active'
            user.authTokens.userRegistration.otp = null
            user.authTokens.userRegistration.expires = null
            await user.save()
            return{
                success: true,
                message: 'Verified Successfully, You can Login Now..'
            }
        }else{
            return{
                success: false,
                message: 'Invalid OTP!'
            }
        }
    }else if(user){
        return{
            success: false,
            message: 'User already Verified!'
        }
    }else{
        return{
            success: false,
            message: 'User not Found!'
        }
    }
}

export const generateResetPasswordOtp = async(email) =>{
    const user = await User.findOne(email)
    console.log(user);
    

    user.authTokens.passwordReset.otp = generateOtp()
    console.log(user);
    
    user.authTokens.passwordReset.expires = new Date(Date.now()+ 2 * 60 * 1000).toISOString()

    await user.save()

    await sendOtp(user.email, user.authTokens.passwordReset.otp)
    return user
}