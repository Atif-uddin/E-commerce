import { object, success } from "zod";


export const updateUserMiddleware = async(req, res, next) =>{
    try {
        const updates = req.validatedData || {}

        const forbiddenFields = [
            'role',
            'password',
            'authTokens',
            'status',
            'isVerified',
            'email'
        ]

        const hasForbiddenField = Object.keys(updates).some(field => forbiddenFields.includes(field))

        if(hasForbiddenField){
            return res.status(400).send({
                success: false,
                message: 'Invalid fields for updates'
            })
        }
        if(Object.keys(updates).length == 0){
            return res.status(400).send({
                success: false,
                message: 'No Data provided for updates'
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