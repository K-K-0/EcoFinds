import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";


const prisma = new PrismaClient();
const router = Router()

router.post('/signup', async (req: any, res: any) => {
    const { email, password, username } = req.body;
    try {
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, username },
        });

        const token = generateToken(newUser.id);
        res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, username } });
    } catch (error) {
        res.status(500).json({ message: "Signup failed" });
    }
});


router.post('login',async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});

export default router
