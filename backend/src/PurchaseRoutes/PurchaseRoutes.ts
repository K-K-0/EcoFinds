import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Router } from "express";
import { Protect } from "../middleware/authMiddleware";


const router = Router()
const prisma = new PrismaClient();

router.post('/purchase', Protect ,async (req: any, res: Response) => {
    try {
        const cartItems = await prisma.cart.findMany({
            where: { userId: req.user.userId },
        });

        const purchases = await prisma.$transaction(
            cartItems.map((item) =>
                prisma.purchase.create({
                    data: { userId: item.userId, productId: item.productId },
                })
            )
        );

        await prisma.cart.deleteMany({
            where: { userId: req.user.userId },
        });

        res.json({ message: "Purchase successful", purchases });
    } catch (error) {
        res.status(500).json({ message: "Failed to purchase" });
    }
});

router.get('/prevPurchases', Protect, async (req: any, res: Response) => {
    const purchases = await prisma.purchase.findMany({
        where: { userId: req.user.userId },
        include: { product: true },
        orderBy: { purchasedAt: "desc" },
    });

    res.json(purchases);
});

export default router