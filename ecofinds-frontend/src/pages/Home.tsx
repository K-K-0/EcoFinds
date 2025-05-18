import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/products/categories");
                const data = await res.json();
                setCategories(data.categories);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/products?search=${search}&category=${category}`
                );
                const data = await res.json();
                setProducts(data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, [search, category]);

    return (
        <div>
            <h1 className="text-2xl font-bold p-4">Available Products</h1>
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search Products"
                    className="border p-2 mb-2 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    title="nothing"
                    className="border p-2 w-full mb-4"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
