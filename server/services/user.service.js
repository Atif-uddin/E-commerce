import User from '../models/user.js'
import {hashPassword} from '../utils/bcrypt.js'
import { generateOtp } from '../utils/otp.js'
import { sendOtp } from './email.service.js'

export const createUser = async({fullname, email, password})=>{
    password = await hashPassword(password, 12)
    const user = new User({fullname, email, password})
    user.authTokens.userRegistration.otp = generateOtp()
    user.authTokens.userRegistration.expires = new Date(Date.now() + 2 * 60 * 1000).toISOString()
    await user.save()

    await sendOtp(user.authTokens.userRegistration.otp)
    return user
}

export const findUserByEmail = async(email)=>{
    const user = await User.findOne({email}).select('-password -authtokens -__v')
    return user
}

export const findUserById = async(id)=>{
    const user = await User.findById(id).select('-password -authTokens -__v')
    return user
}

export const findUserByEmailAndDelete = async(email) =>{
    const user = await User.findOneAndDelete({email})
    return user
}