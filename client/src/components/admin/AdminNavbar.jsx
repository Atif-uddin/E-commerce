import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {

    const { user } = useAuth();

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">

            <h1 className="text-2xl font-bold">
                Admin Dashboard
            </h1>

            <p className="font-medium">
                Welcome, {user?.name}
            </p>

        </header>
    );
};

export default AdminNavbar;