import { useEffect, useState } from "react";

import { deleteUser, getAllUsers } from "../../api/admin.api";

import UserTable from "../../components/admin/UserTable";
import UserDetailsModal from "../../components/admin/UserDetailsModal";
import UserStatusModal from "../../components/admin/UserStatusModal";
import DeleteModal from "../../components/admin/DeleteModal";

const Users = () => {

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [detailsModal, setDetailsModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const fetchUsers = async () => {

        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
            setMessage(response.message);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch users."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteHandler = async () => {
        try {
            setLoading(true);
            await deleteUser(selectedUser._id);
            await fetchUsers();
            closeAllModals();
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const openDetailsModal = (user) => {

        setSelectedUser(user);
        setDetailsModal(true);
    };

    const openStatusModal = (user) => {

        setSelectedUser(user);
        setStatusModal(true);
    };

    const openDeleteModal = (user) => {

        setSelectedUser(user);
        setDeleteModal(true);
    };

    const closeAllModals = () => {

        setDetailsModal(false);
        setStatusModal(false);
        setDeleteModal(false);
        setSelectedUser(null);
    };

    return (

        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">
                Users
            </h1>
            {
                message && (
                    <div className="mb-4 rounded-lg bg-green-100 text-green-700 px-4 py-3">
                        {message}
                    </div>
                )
            }

            {
                error && (
                    <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3">
                        {error}
                    </div>
                )
            }
            <UserTable
                users={users}
                loading={loading}
                onView={openDetailsModal}
                onEdit={openStatusModal}
                onDelete={openDeleteModal}
            />

            <UserDetailsModal
                isOpen={detailsModal}
                onClose={closeAllModals}
                user={selectedUser}
                onUpdate={openStatusModal}
                onEdit={openStatusModal}
            />

            <UserStatusModal
                isOpen={statusModal}
                onClose={closeAllModals}
                user={selectedUser}
                fetchUsers={fetchUsers}
            />

            <DeleteModal
                isOpen={deleteModal}
                title="Delete User"
                message={`Are you sure you want to delete ${selectedUser?.fullname}?`}
                loading={loading}
                onClose={closeAllModals}
                onConfirm={ deleteHandler }
            />
        </div>
    );
};

export default Users;