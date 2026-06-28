import { useEffect, useState } from "react";
import { getDashboard } from "../../api/admin.api";
import {
    Users,
    Package,
    ShoppingCart,
    Clock3,
    CircleCheckBig,
    IndianRupee,
} from "lucide-react";

import DashboardCard from "../../components/admin/DashboardCard";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null)

    const fetchDashboard = async () => {
        try {
            const response = await getDashboard()
            console.log("Dashboard Response:", response);

            setDashboard(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    if (!dashboard) {
        return <h2 className="flex justify-center">Loading Dashboard...</h2>
    }
    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <DashboardCard
                    title='Users'
                    value={dashboard.totalUsers}
                    icon={<Users size={30} strokeWidth={2.2} />}
                    color="bg-blue-100"
                />

                <DashboardCard
                    title="Products"
                    value={dashboard.totalProducts}
                    icon={<Package size={30} strokeWidth={2.2} />}
                    color="bg-green-100 text-green-600"
                />

                <DashboardCard
                    title="Orders"
                    value={dashboard.totalOrders}
                    icon={<ShoppingCart size={30} strokeWidth={2.2} />}
                    color="bg-violet-100 text-violet-600"
                />

                <DashboardCard
                    title="Pending Orders"
                    value={dashboard.pendingOrders}
                    icon={<Clock3 size={30} strokeWidth={2.2} />}
                    color="bg-amber-100 text-amber-600"
                />

                <DashboardCard
                    title="completed Orders"
                    value={dashboard.completedOrders}
                    icon={<CircleCheckBig size={30} strokeWidth={2.2} />}
                    color="bg-emerald-100 text-emerald-600"
                />

                <DashboardCard
                    title="Revenue"
                    value={`₹ ${dashboard.totalRevenue}`}
                    icon={<IndianRupee size={30} strokeWidth={2.2} />}
                    color="bg-emerald-100 text-emerald-600"
                />
            </div>
        </div>
    );
};

export default Dashboard;