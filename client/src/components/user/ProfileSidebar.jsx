import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { updateUser } from "../../api/user.api"

const ProfileSidebar = ({ isOpen, onClose, onLogout }) => {

    const { user, setUser } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({
        fullname: user?.fullname || '',
        phoneNumber: user?.phoneNumber || ''
    })

    const handleChange = (e) => {
        setEditData({
            ...editData, [e.target.name]: e.target.value
        })
    }

    const saveHandler = async() =>{
        try {
            const response = await updateUser(editData)
            console.log(response)

            setUser({
                ...user,
                fullname: editData.fullname,
                phoneNumber: editData.phoneNumber
            })
            setIsEditing(false)
        } catch (error) {
            console.log(error);
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50">

            <button onClick={onClose} className="mb-4 border px-2 py-1 rounded">
                X
            </button>

            <h2 className="text-xl font-bold mb-4"> Profile </h2>

            {
                isEditing ? (
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="fullname"
                            value={editData.fullname}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="border p-2 rounded"
                        />

                        <input
                            type="text"
                            name="phoneNumber"
                            value={editData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="border p-2 rounded"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">

                        <p> <strong>Name:</strong> {user?.fullname} </p>

                        <p> <strong>Email:</strong> {user?.email} </p>

                        <p> <strong>Phone:</strong> {user?.phoneNumber} </p>

                        <p><strong>Role:</strong> {user?.role}</p>
                    </div>
                )
            }
            <div className="mt-6 flex flex-col gap-2">

                {
                    isEditing ? (
                        <>
                            <button onClick={saveHandler} className="bg-green-500 text-white p-2 rounded">
                                Save
                            </button>

                            <button onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white p-2 rounded">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white p-2 rounded">
                            Edit Profile
                        </button>
                    )
                }

                <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded">
                    Logout
                </button>
            </div>
        </div>
    )
}
export default ProfileSidebar