import jwt from 'jsonwebtoken'
import { email } from 'zod'


export const generateJwtToken = (user)=>{
    // console.log('Generate payload: ', payload);
    
    try {
        const payload = {
            _id : user._id,
            role : user.role,
            email : user.email
        }
        const jwtToken = jwt.sign({data: payload }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY})
        return jwtToken
    } catch (error) {
        console.log(error);
    }
}

export const validateJWTToken = async(token)=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded);
        // console.log(decoded.data);
        
        return decoded.data
        
    } catch (error) {
        console.log(error);
        return null
    }
}