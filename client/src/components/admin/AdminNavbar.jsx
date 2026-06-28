import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLogout } from "../../api/admin.api";

const AdminNavbar = () => {

    const navigate = useNavigate()
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false)

    const logoutHandler = async() =>{
        try {
            await AdminLogout()
            logout()
            navigate('/login')
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">

            <h1 className="text-2xl font-bold">
                Admin Dashboard
            </h1>

            <div className="relative">

                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">

                        {user?.fullname?.charAt(0).toUpperCase()}

                    </div>

                    <span className="font-medium">
                        {user?.fullname}
                    </span>
                </button>

                {
                    open && (
                        <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-lg border p-4 z-50">

                            <h2 className="font-bold">
                                {user?.fullname}
                            </h2>

                            <p className="text-gray-500 text-sm">
                                {user?.email}
                            </p>

                            <p className="mt-2 text-sm">
                                Role:
                                <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded">
                                    {user?.role}
                                </span>
                            </p>

                            <button
                                onClick={logoutHandler}
                                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                                Logout
                            </button>
                        </div>
                    )
                }
            </div>
        </header>
    );
};

export default AdminNavbar;