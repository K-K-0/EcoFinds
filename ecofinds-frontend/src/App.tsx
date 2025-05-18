import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup"

import PreviousPurchases from "./pages/PreviousPurchases";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/previous-purchases" element={<PreviousPurchases />} />

      </Routes>
    </div>
  );
}
