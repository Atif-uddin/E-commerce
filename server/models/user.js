import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum:['pending', 'active', 'inActive'],
        default: 'pending'
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    authTokens:{
        userRegistration:{
            otp:{
                type: String,
                default: 'null'
            },
            expires:{
                type: String,
                default: 'null'
            }
        },
        passwordReset:{
            otp:{
                type: String,
                default: 'null'
            },
            expires:{
                type: String,
                default: 'null'
            }
        }
    },
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User
