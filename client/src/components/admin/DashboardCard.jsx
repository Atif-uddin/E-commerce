const DashboardCard = ({ title, value, icon, color }) => {
    return (
        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-xl
                transition
                duration-300
                p-6
                mt-5
                border
            "
        >
            <div className="flex justify-between items-center">

                <div
                    className={`
                        w-14
                        h-14
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        ${color}`}>
                    {icon}
                </div>

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>

                </div>

            </div>
        </div>
    );
};

export default DashboardCard;