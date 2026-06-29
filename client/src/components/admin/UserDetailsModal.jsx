const UserDetailsModal = ({
    isOpen,
    onClose,
    user,
    onEdit
}) => {

    if (!isOpen || !user) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-full max-w-3xl p-8">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-3xl font-bold">
                        User Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl font-bold">
                        ×
                    </button>

                </div>

                <div className="flex items-center gap-6 mb-8">

                    <img
                        src={
                            user.profileImage ||
                            "https://placehold.co/120x120"
                        }
                        alt={user.fullname}
                        className="w-28 h-28 rounded-full object-cover border"
                    />

                    <div>

                        <h3 className="text-2xl font-bold">
                            {user.fullname}
                        </h3>

                        <p className="text-gray-600">
                            {user.email}
                        </p>

                        <p className="text-gray-500">
                            {user.phoneNumber}
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">

                    <div>

                        <h4 className="font-semibold mb-2">
                            Role
                        </h4>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium
                                ${user.role === "admin"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}>
                            {user.role}
                        </span>

                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">
                            Email Verification
                        </h4>

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

                    </div>

                    <div>

                        <h4 className="font-semibold mb-2">
                            Account Status
                        </h4>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium
                                ${user.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : user.status === "inActive"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}>
                            {user.status}
                        </span>
                    </div>

                    <div>

                        <h4 className="font-semibold mb-2">
                            Joined
                        </h4>

                        <p>
                            {
                                new Date(
                                    user.createdAt
                                ).toLocaleDateString()
                            }
                        </p>

                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded-lg">
                        Close
                    </button>

                    <button
                        onClick={() => onEdit(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg">
                        Edit User
                    </button>

                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;