import User from '../models/user.js'
import { hashPassword } from '../utils/bcrypt.js'
import {generateOtp} from '../utils/otp.js'
import { sendOtp } from '../services/email.service.js'
import dbConnect from '../config/mongo.config.js'

const seedAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' })
        if (existingAdmin) {
            console.log('Admin already Exists!');
            return
        }

        const otp = generateOtp()
        const expires = new Date(Date.now() + 2 * 60 *1000)

        const adminData = {
            fullname: 'Atifuddin',
            email: 'uddinatif34@gmail.com',
            password: 'Admin@123',
            role: 'admin',
            phoneNumber: '7995586742',
            authTokens: {
                userRegistration: {
                    otp,
                    expires
                }
            },
            isVerified: true,
            status : 'active'
        }
        adminData.password = await hashPassword(adminData.password)

        const admin = await User.create(adminData)
        await sendOtp(adminData.email, otp)
        
        console.log('Admin seeded successfull!');
        console.log('OTP sent to', adminData.email);
        

    } catch (error) {
        console.log('Falied to Seed Admin');
        console.log(error);
    }
}

await dbConnect()
await seedAdmin()