import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../../api/product.api";

const ProductDetails = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await getProductById(productId);

                console.log(response);

                setProduct(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchProduct();

    }, [productId]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!product) {
        return <h1>Product Not Found</h1>;
    }

    return (
        <div className="max-w-6xl mx-auto p-5">

            <div className="grid md:grid-cols-2 gap-10">

                <div>
                    <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="w-full rounded-lg"
                    />
                </div>

                <div>

                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>

                    <p className="text-gray-600 mt-2">
                        {product.brand}
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-4">
                        ₹ {product.price}
                    </p>

                    <p className="mt-4">
                        Stock: {product.stock}
                    </p>

                    <p className="mt-4">
                        Rating: {product.rating}
                    </p>

                    <p className="mt-6">
                        {product.description}
                    </p>

                    <button
                        className="mt-6 bg-blue-500 text-white px-5 py-3 rounded"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;