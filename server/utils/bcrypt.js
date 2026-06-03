import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const salt_rounds = Number(process.env.salt_rounds)

export const hashPassword = async(password)=>{
    try {
        const hashedPassword = await bcrypt.hash(password, salt_rounds)
        return hashedPassword
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async(password, hashedPassword)=>{
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match
    } catch (error) {
        console.log(error);
    }
}
