// src/pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/products/${id}`);
                const data = await res.json();
                setProduct(data.product);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="max-w-2xl mx-auto">
                <img
                    src={product.image || "https://via.placeholder.com/500"}
                    alt={product.title}
                    className="w-full h-64 object-cover mb-4"
                />
                <h1 className="text-3xl font-semibold">{product.title}</h1>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-lg font-bold my-4">${product.price}</p>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
