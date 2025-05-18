import { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSignup = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "/";
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Signup</h1>
            <input
                type="email"
                placeholder="Email"
                className="border p-2 mb-2"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                className="border p-2 mb-2"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 mb-4"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup} className="bg-green-500 text-white p-2 rounded">
                Signup
            </button>
        </div>
    );
}
