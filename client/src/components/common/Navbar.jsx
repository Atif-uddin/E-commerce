import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/auth.api";

const Navbar = () => {

    const { user, logout} = useAuth();
    const navigate = useNavigate()
    // console.log("AUTH USER:", user);

    const logoutHandler = async () => {
        try {
            const response = await logoutUser()

            console.log(response)

            logout()

            navigate('/login')
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <nav className="flex justify-between items-center p-4 border-b">
            <div>
                <Link to= '/' className="font-bold text-xl" >
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

                            <Link to="/profile"> Profile </Link>

                            <button onClick={logoutHandler} className="bg-red-500 text-white px-3 py-1 rounded">
                                Logout
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
    );
};

export default Navbar;