


export const getUserDetails = async(req, res) =>{
    try {
        const {
            fullname,
            email,
            phoneNumber,
            role
        } = req.user
        return res.status(200).send({
            success: true,
            data: {
                fullname,
                email,
                phoneNumber,
                role
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}