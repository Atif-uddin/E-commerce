import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "../../validations/auth.validation";
import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

const LoginUser = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState({
    message: '',
    type: ''
  })

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const {login} = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const loginHandler = async (e) => {
    e.preventDefault()

    const result = loginSchema.safeParse(formData)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return
    }
    setErrors({})

    try {
      setLoading(true)

      const response = await loginUser(result.data)
      login(response.data)
      console.log(response);
      
      setAlert({
        message: response.message,
        type: 'success'
      })

      setFormData({
        email: '',
        password: ''
      })

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data)

      setAlert({
        message:
          error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.message ||
          'Something went wrong!',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {
        alert.message && (
          <p className={alert.type == 'success' ? 'text-green-500' : 'text-red-500'}>
            {alert.message}
          </p>
        )
      }
      <form className="flex flex-col gap-3" onSubmit={loginHandler}>

        <input type="text" name="email" placeholder="Email" value={formData.email}
          onChange={handleChange} className="border p-2 rounded" />

        {
          errors.email && (
            <p className="text-red-500">
              {errors.email[0]}
            </p>
          )
        }

        <input type="password" name="password" placeholder="password" value={formData.password}
          onChange={handleChange} className="border p-2 rounded" />

        {
          errors.password && (
            <p className="text-red-500">
              {errors.password[0]}
            </p>
          )
        }

        <button type="submit" disabled={loading} className="bg-blue-500 p-2 text-white rounded">
          {loading ? 'Logging In...' : 'Login'}
        </button>

      </form>
    </div>
  )
}

export default LoginUser