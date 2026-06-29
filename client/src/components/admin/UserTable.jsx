const UserTable = ({
    users,
    loading,
    onView,
    onEdit,
    onDelete
}) => {

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <h2 className="text-lg font-semibold">
                    Loading Users...
                </h2>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold">
                    No Users Found
                </h2>
            </div>
        );
    }

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-4">
                            Avatar
                        </th>

                        <th className="text-left p-4">
                            Name
                        </th>

                        <th className="text-left p-4">
                            Email
                        </th>

                        <th className="text-left p-4">
                            Phone
                        </th>

                        <th className="text-left p-4">
                            Role
                        </th>

                        <th className="text-left p-4">
                            Verified
                        </th>

                        <th className="text-left p-4">
                            Status
                        </th>

                        <th className="text-center p-4">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map(user => (
                            <tr
                                key={user._id}
                                className="border-t hover:bg-gray-50 transition">
                                <td className="p-4">
                                    <img
                                        src={
                                            user.profileImage ||
                                            "https://placehold.co/60x60"
                                        }
                                        alt={user.fullname}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />

                                </td>

                                <td className="p-4 font-medium">
                                    {user.fullname}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">
                                    {user.phoneNumber}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${user.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}>
                                        {user.role}
                                    </span>
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${user.isVerified
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}>
                                        {
                                            user.isVerified
                                                ? "Verified"
                                                : "Not Verified"
                                        }
                                    </span>

                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${user.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : user.status === "inActive"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {user.status}
                                    </span>

                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onView(user)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => onEdit(user)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(user)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>

    );

};

export default UserTable;