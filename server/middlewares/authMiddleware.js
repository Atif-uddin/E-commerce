import { findUserByEmail, findUserByEmailAndDelete } from "../services/user.service.js"


// console.log('hello');


export const validateRegisterMiddleware = async({fullname, email, password, phoneNumber}) =>{
    const errors = {}
    if(!fullname){
        errors.fullname = 'fullname is required!'
    }
    if(!email){
        errors.email = 'Email is required!'
    }
    if(!password){
        errors.password = 'password is required!'
    }
    if(!phoneNumber){
        errors.phoneNumber = 'phone number is required'
    }
    return errors
}


export const registerMiddleware = async(req, res, next)=>{
    
    try {
      const {fullname, email, password, phoneNumber} = req.body || {}
      const errors = await validateRegisterMiddleware({fullname, email, password, phoneNumber})  
      if(Object.keys(errors).length > 0){
        return res.status(404).send({
            success: false,
            message: 'Please fill the details first',
            errors
        })
      }

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

      req.user = {
        fullname,
        email,
        password,
        phoneNumber
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
        const {email, otp} = req.body || {}
        // console.log('test1');
        console.log(email, otp);
        
        if(!email){
            return res.status(400).send({
                success: false,
                message: 'Email is required !'
            })
        }
        if(!otp){
            return res.status(400).send({
                success: false,
                message: 'OTP is required ! '
            })
        }
        
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
        req.user = user
        req.user.otp = otp
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}