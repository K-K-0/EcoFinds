import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import controllers from './AuthRoutes/controllers'
import cookieParser from "cookie-parser";
import ProductRoutes from './ProductRoutes/ProductRoutes'
import CartRoutes from './CartRoutes/CartRoutes'
import PurchaseRoutes from './ProductRoutes/ProductRoutes'
import ProfileRoutes from './ProfileRoute/ProfileRoutes'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use(controllers)
app.use(ProductRoutes)
app.use(CartRoutes)
app.use(PurchaseRoutes)
app.use(ProfileRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
