import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Protect } from "../middleware/authMiddleware";

const prisma = new PrismaClient();
const router = Router()

router.post('/addToCart',Protect, async (req: any, res: any) => {
    const { productId } = req.body;
    try {
        const exists = await prisma.cart.findUnique({
            where: { userId_productId: { userId: req.user.userId, productId } },
        });
        if (exists) return res.status(400).json({ message: "Item already in cart" });

        const item = await prisma.cart.create({
            data: { userId: req.user.userId, productId },
            include: { product: true },
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: "Failed to add to cart" });
    }
});

router.get('/getCartItem', async (req: any, res:any) => {
    const items = await prisma.cart.findMany({
        where: { userId: req.user.userId },
        include: { product: true },
    });
    res.json(items);
});

router.delete('/delete/:productId', Protect, async (req: any, res: any) => {
    const { productId } = req.params;
    await prisma.cart.delete({
        where: { userId_productId: { userId: req.user.userId, productId } },
    });
    res.json({ message: "Removed from cart" });
});


export default router