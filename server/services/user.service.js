import User from '../models/user.js'
import {hashPassword} from '../utils/bcrypt.js'
import { generateOtp } from '../utils/otp.js'
import { sendOtp } from './email.service.js'

export const createUser = async({fullname, email, password, phoneNumber})=>{
    password = await hashPassword(password, 12)
    const user = new User({fullname, email, password, phoneNumber})
    user.authTokens.userRegistration.otp = generateOtp()
    user.authTokens.userRegistration.expires = new Date(Date.now() + 1 * 60 * 1000).toISOString()
    await user.save()

    await sendOtp(
        user.email,
        user.authTokens.userRegistration.otp
    )
    return user
}

export const findUserByEmail = async(email)=>{
    const user = await User.findOne({email}).select('-password -authTokens -__v')
    // console.log(user);
    return user
}

export const findUserById = async(id)=>{
    const user = await User.findById(id).select('-password -__v -authTokens')
    return user
}

export const findUserByEmailAndDelete = async(email) =>{
    const user = await User.findOneAndDelete({email})
    return user
}


export const updateUser = async(id, updates) =>{
    const user = await User.findByIdAndUpdate(id, updates, { returnDocument: 'after', runValidators: true})
    .select('-authTokens -__v -createdAt -updatedAt -_id -password -status -isVerified')
    return user
}

export const deleteUserById = async(id) =>{
    const user = await User.findByIdAndUpdate(id, {status: 'inActive', isVerified: false}, {returnDocument: 'after'})
    await user.save()
    return user
}