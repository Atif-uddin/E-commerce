import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { verifyEmailSchema } from "../../validations/auth.validation";
import { verifyEmail } from "../../api/auth.api";


const VerifyEmail = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [alert, setAlert] = useState({
        message: '',
        type: ''
    })
    const [formData, setFormData] = useState({
        email: '',
        otp: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const verifyHandler = async (e) => {
        e.preventDefault()

        const result = verifyEmailSchema.safeParse(formData)
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
            return
        }
        setErrors({})
        try {
            setLoading(true)

            const payload = {
                email: formData.email,
                otp: Number(formData.otp)
            }

            const response = await verifyEmail(payload)

            setAlert({
                message: response.message,
                type: 'success'
            })

            setFormData({ otp: '' })

            setTimeout(() => {
                navigate('/login')
            }, 1500)

        } catch (error) {
            setAlert({
                message: error.response?.data?.message || 'something went wrong!',
                type: 'error',

            })
            console.log(error.response.data)

            if (error.response?.data?.errors) {
                setAlert({
                    message: error.response.data.errors[0].message,
                    type: 'error'
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='max-w-md mx-auto mt-10'>
            <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
            {
                alert.message && (
                    <p className={alert.type == 'success' ? 'text-green-500' : 'text-red-500'}>{alert.message}</p>
                )
            }
            <form onSubmit={verifyHandler} className="flex flex-col gap-3">
                <input type="email" name="email" placeholder="Email" value={formData.email}
                    onChange={handleChange} className="border p-2 rounded"
                />
                <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp}
                    onChange={handleChange} className="border p-2 rounded" />
                {
                    errors.otp && (
                        <p className="text-red-500">
                            {errors.otp[0]}
                        </p>
                    )
                }
                <button type="submit" disabled={loading} className="bg-blue-500 rounded p-2 text-white">
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>

        </div>
    )
}

export default VerifyEmail