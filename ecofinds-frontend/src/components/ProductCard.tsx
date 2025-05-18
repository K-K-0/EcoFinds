// src/components/ProductCard.tsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: any }) {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <img src={product.image || "https://via.placeholder.com/150"} alt={product.title} className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="font-semibold">{product.title}</h3>
            <p>{product.price}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500 mt-2 block">
                View Details
            </Link>
        </div>
    );
}
