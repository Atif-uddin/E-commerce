import User from "../models/user.js"
import { comparePassword } from "../utils/bcrypt.js"



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
            user.authTokens.userRegistration.otp == null
            user.authTokens.userRegistration.expires == null
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