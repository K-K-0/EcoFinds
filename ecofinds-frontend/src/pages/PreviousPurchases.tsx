// src/pages/PreviousPurchases.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PreviousPurchases() {
    const [purchases, setPurchases] = useState<any[]>([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/users/purchases");
                const data = await res.json();
                setPurchases(data.purchases);
            } catch (err) {
                console.error("Error fetching previous purchases:", err);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Previous Purchases</h1>
            {purchases.length === 0 ? (
                <p>No previous purchases found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {purchases.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-md">
                            <img
                                src={product.image || "https://via.placeholder.com/150"}
                                alt={product.title}
                                className="w-full h-40 object-cover mb-4 rounded"
                            />
                            <h3 className="font-semibold">{product.title}</h3>
                            <p>{product.price}</p>
                            <Link to={`/product/${product.id}`} className="text-blue-500 mt-2 block">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
