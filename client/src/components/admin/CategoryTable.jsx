const CategoryTable = ({ category, loading }) => {

    if (loading) {
        return (
            <div className="flex justify-center py-10">

                <h2 className="text-lg font-semibold">
                    Loading Categories...
                </h2>
            </div>
        );
    }

    if (category.length === 0) {
        return (

            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold">
                    No Categories Found
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
                            Image
                        </th>

                        <th className="text-left p-4">
                            Name
                        </th>

                        <th className="text-left p-4">
                            Slug
                        </th>

                        <th className="text-left p-4">
                            Created
                        </th>

                        <th className="text-center p-4">
                            Actions
                        </th>

                    </tr>
                </thead>

                <tbody>
                    {
                        category.map(category => (

                            <tr
                                key={category._id}
                                className="border-t hover:bg-gray-50 transition">

                                <td className="p-4">

                                    <img
                                        src={
                                            category.images?.[0]?.url ||
                                            "https://placehold.co/60x60"
                                        }
                                        alt={category.name}
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />
                                </td>

                                <td className="p-4 font-medium">
                                    {category.name}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {category.slug}
                                </td>

                                <td className="p-4 text-gray-500">

                                    {
                                        new Date(category.createdAt).toLocaleDateString()
                                    }
                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-3">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition">
                                            Edit
                                        </button>

                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
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

export default CategoryTable