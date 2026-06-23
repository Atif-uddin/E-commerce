import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/auth.api";
import { useState } from "react";
import ProfileSidebar from "../user/ProfileSidebar";

const Navbar = () => {

    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const navigate = useNavigate()
    // console.log("AUTH USER:", user);

    const logoutHandler = async () => {
        try {
            const response = await logoutUser()

            console.log(response)

            logout()

            setIsProfileOpen(false)

            navigate('/login')
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <nav className="flex justify-between items-center p-4 border-b">
                <div>
                    <Link to='/' className="font-bold text-xl" >
                        ShopSphere
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/">
                        Home
                    </Link>
                    {
                        user ? (
                            <>
                                <span> Welcome, {user.fullname} </span>

                                <Link to="/cart"> Cart </Link>

                                <button onClick={() => setIsProfileOpen(true)}>
                                    Profile
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"> Login </Link>

                                <Link to="/register"> Register </Link>
                            </>
                        )
                    }
                </div>
            </nav>

            <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} onLogout={logoutHandler} />
        </>
    );
};


export default Navbar;