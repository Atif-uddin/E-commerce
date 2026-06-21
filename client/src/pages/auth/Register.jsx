import { useEffect, useState } from 'react'
import { registerSchema } from '../../validations/auth.validation'
import { registerUser } from '../../api/auth.api'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState({
        message: '',
        type: ''
    })
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const registerHandler = async (e) => {

        e.preventDefault()
        const result = registerSchema.safeParse(formData)

        if (!result.success) {

            const formattedErrors = result.error.flatten().fieldErrors
            setErrors(formattedErrors)
            return
        }
        setErrors({})
        console.log("VALID DATA :", result.data);
        try {
            setLoading(true)
            const response = await registerUser(result.data)
            console.log(response);
            setMessage(response.message)
            setAlert({
                message: response.message,
                type: 'success'
            })
            setFormData({
                fullname: '',
                email : '',
                password : '',
                phoneNumber : ''
            })
            setLoading(false)
        } catch (error) {
            console.log(error);
            setMessage(error.response?.data?.message || 'Something Went Wrong!') 
            setAlert({
                message: error.response?.data?.message || 'something wrong!',
                type: 'error'
            })
        }

    }


    return (
        <div className='max-w-md mx-auto mt-10'>
            <h1 className='text-2xl font-bold mb-4'>Register</h1>
            {
                alert.message && (
                    <p className={alert.type == 'success' ? 'text-green-500' : 'text-red-500'}>{alert.message}</p>
                )
            }
            <form onSubmit={registerHandler} className='flex flex-col gap-3'>
                <input onChange={handleChange}
                    value={formData.fullname} 
                    type="text" name='fullname' placeholder='Full Name' className='border p-2 rounded'/>
                {errors.fullname && (<p className='text-red-500'>{errors.fullname[0]}</p>)}

                <input onChange={handleChange} 
                    value={formData.email} 
                    type="email" name='email' placeholder='Email' className='border p-2 rounded' />
                {errors.email && (<p className='text-red-500'>{errors.email[0]}</p>)}

                <input onChange={handleChange}
                    value={formData.password} 
                    type="password" name='password' placeholder='Password' className='border p-2 rounded' />
                {errors.password && (<p className='text-red-500'>{errors.password[0]}</p>)}

                <input onChange={handleChange} 
                    value={formData.phoneNumber} 
                    type="text" name='phoneNumber' placeholder='Phone Number' className='border p-2 rounded'/>
                {errors.phoneNumber && (<p className='text-red-500'>{errors.phoneNumber[0]}</p>)}

                <button type='submit' disabled={loading} className='bg-blue-500 text-white p-2 rounded'>
                    {loading ? "Registering..." : "Register"}
                    </button>
            </form>
        </div>
    )
}

export default Register