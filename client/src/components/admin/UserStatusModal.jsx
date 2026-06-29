import { useEffect, useState } from "react";
import { updateUserById } from "../../api/admin.api";

const UserStatusModal = ({
    isOpen,
    onClose,
    user,
    fetchUsers
}) => {

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(user);

    useEffect(() => {

        if (user) {
            setStatus(user.status);
        }

    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);
            await updateUserById(
                user._id, { status }
            );
            await fetchUsers();
            onClose();
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        Update User Status
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl font-bold">
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div className="mb-15">

                        <label className="block mb-2 font-medium">

                            Account Status

                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3">
                            <option value="active">Active</option>
                            <option value="inActive">Inactive</option>
                            <option value="pending">Pending</option>
                        </select>

                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-lg">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                            {
                                loading
                                    ? "Updating..."
                                    : "Update Status"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserStatusModal;