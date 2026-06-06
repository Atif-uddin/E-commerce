import { findUserByEmail, findUserByEmailAndDelete } from "../services/user.service.js"
import { validatePassword } from "../services/auth.service.js";


// console.log('hello');


export const registerMiddleware = async(req, res, next)=>{
    
    try {
      const {fullname, email, password, phoneNumber} = req.validatedData || {}

      const existingUser = await findUserByEmail(email)
      console.log(existingUser);
      
    //   if(existingUser){
    //     return res.status(400).send({
    //         success: false,
    //         message: "User Found"
    //     })
    //   }

      if(existingUser && existingUser.status != 'pending'){
        return res.status(404).send({
            success: false,
            message: 'User Already Exists'
        })
      }
      if(existingUser && existingUser.status == 'pending'){
        await findUserByEmailAndDelete(email)
      }

      next()
      
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export const verifyEmailMiddleware = async(req, res, next)=>{
    try {
        const {email, otp} = req.validatedData || {}
        // console.log('test1');
        console.log(email, otp);
        
        const user = await findUserByEmail(email)
        console.log(user);
        // console.log('Hello');
        

        if(!user){
            return res.status(400).send({
                success: false,
                message: 'User not Found !'
            })
        }
        if(user.status == 'inActive'){
            return res.status(400).send({
                success: false,
                message: 'User is inactive'
            })
        }
        // if(user.status == 'pending'){
        //     return res.status(400).send({
        //         success: false,
        //         message: 'User not verified or registered yet'
        //     })
        // }
        
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const userLoginMiddleware = async(req, res, next) =>{
    try {
        const {email, password} = req.validatedData || {}

        const user = await findUserByEmail(email)
        if(!user){
            return res.status(400).send({
                success: false,
                message: 'User not Found'
            })
        }

        const isValid = await validatePassword(user._id, password)
        if(!isValid){
            return res.status(400).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}