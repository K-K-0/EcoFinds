
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-blue-500 text-white p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="font-semibold">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/add" className="font-semibold">
                        Add Product
                    </Link>
                </li>
                <li>
                    <Link to="/my-listings" className="font-semibold">
                        My Listings
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className="font-semibold">
                        Cart
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard" className="font-semibold">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/previous-purchases" className="text-blue-500">Previous Purchases</Link>
                </li>
                <li>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="font-semibold text-red-500"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}
