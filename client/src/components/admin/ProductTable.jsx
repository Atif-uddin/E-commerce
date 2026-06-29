const ProductTable = ({
    products,
    loading,
    onEdit,
    onDelete
}) => {

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <h2 className="text-lg font-semibold">
                    Loading Products...
                </h2>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold">
                    No Products Found
                </h2>
            </div>
        );
    }

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-4">Image</th>

                        <th className="text-left p-4">Product</th>

                        <th className="text-left p-4">Category</th>

                        <th className="text-left p-4">Brand</th>

                        <th className="text-left p-4">Price</th>

                        <th className="text-left p-4">Stock</th>

                        <th className="text-left p-4">Status</th>

                        <th className="text-center p-4">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        products.map((product) => (

                            <tr
                                key={product._id}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                <td className="p-4">

                                    <img
                                        src={
                                            product.images?.[0]?.url ||
                                            "https://placehold.co/60x60"
                                        }
                                        alt={product.name}
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />

                                </td>

                                <td className="p-4 font-medium">
                                    {product.name}
                                </td>

                                <td className="p-4">
                                    {product.category?.name || "-"}
                                </td>

                                <td className="p-4">
                                    {product.brand || "-"}
                                </td>

                                <td className="p-4 font-semibold text-green-600">
                                    ₹ {product.price}
                                </td>

                                <td className="p-4">

                                    {
                                        product.stock > 0
                                            ? product.stock
                                            : (
                                                <span className="text-red-500 font-medium">
                                                    Out of Stock
                                                </span>
                                            )
                                    }

                                </td>

                                <td className="p-4">

                                    {
                                        product.isActive ? (

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                Active
                                            </span>

                                        ) : (

                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                                Inactive
                                            </span>

                                        )
                                    }

                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => onEdit(product)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(product)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
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

export default ProductTable;