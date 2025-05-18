import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import controllers from './controllers/controllers'
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use(controllers)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
