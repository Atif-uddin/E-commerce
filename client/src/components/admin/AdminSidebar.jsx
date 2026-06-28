import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">

            <h2 className="text-2xl font-bold mb-8">
                Admin Panel
            </h2>

            <nav className="flex flex-col gap-4">

                <NavLink to="/admin/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/admin/products">
                    Products
                </NavLink>

                <NavLink to="/admin/categories">
                    Categories
                </NavLink>

                <NavLink to="/admin/orders">
                    Orders
                </NavLink>

                <NavLink to="/admin/users">
                    Users
                </NavLink>

            </nav>

        </aside>
    );
};

export default AdminSidebar;