import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const { user } = useAuth();
    console.log("AUTH USER:", user);

    return (
        <nav className="flex justify-between items-center p-4 border-b">
            <Link to="/">
                Home
            </Link>
            <div className="flex gap-4">
                {
                    user ? (
                        <>
                            <span> Welcome, {user.fullname} </span>

                            <Link to="/profile"> Profile </Link>
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