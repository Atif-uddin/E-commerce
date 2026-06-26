import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useState } from "react";
import ProfileSidebar from "../user/ProfileSidebar";

import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/auth.api";

const Navbar = () => {
    const { wishlistCount } = useWishlist()
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
                    <Link to="/" className="hover:text-blue-600">
                        Home
                    </Link>
                    {
                        user ? (
                            <>
                                <span> Welcome, {user.fullname} </span>

                                <Link to="/cart" className="hover:text-blue-600"> Cart </Link>

                                <Link to="/wishlist" className="hover:text-blue-600">
                                    Wishlist
                                    {
                                        wishlistCount > 0 && (

                                            <span
                                                className="
                                                    absolute
                                                    top-1
                                                    right-40
                                                    bg-red-500
                                                    text-white
                                                    rounded-full
                                                    w-5
                                                    h-5
                                                    text-xs
                                                    flex
                                                    items-center
                                                    justify-center"
                                            >
                                                {wishlistCount}
                                            </span>

                                        )
                                    }
                                </Link>

                                <Link to='/orders' className="hover:text-blue-600"> My Orders </Link>

                                <button className="hover:text-blue-600"
                                    onClick={() => setIsProfileOpen(true)}>
                                    Profile
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-600"> Login </Link>

                                <Link to="/register" className="hover:text-blue-600"> Register </Link>
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