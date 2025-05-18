import { Request, Response, Router } from "express";
import  prisma  from "@prisma/client";
import { Protect } from "../middleware/authMiddleware";

const router = Router()





router.get('profile', Protect, async (req: any, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                email: true,
                username: true,
                name: true,
                bio: true,
                location: true,
                createdAt: true,
            },
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch profile." });
    }
});



router.put('/ProfileUpdate', Protect, async (req: any, res: Response) => {
    try {
        const { username, name, bio, location } = req.body;

        const updated = await prisma.user.update({
            where: { id: req.user.userId },
            data: {
                username,
                name,
                bio,
                location,
            },
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update profile." });
    }
});


export default router
