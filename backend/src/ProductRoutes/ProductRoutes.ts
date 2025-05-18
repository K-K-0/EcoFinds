import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Router } from "express";
import { Protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/upload";

const prisma = new PrismaClient();
const router = Router()


router.post('/create', Protect, upload.single("image"), async (req: any, res: Response) => {
    const { title, description, category, price } = req.body;
    const imageUrl = req.file?.path || "";
    try {
        const product = await prisma.product.create({
            data: {
                title,
                description,
                category,
                price: parseFloat(price),
                imageUrl,
                ownerId: req.user.userId,
            },
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: "Create failed" });
    }
});

router.get('getProduct:id', async (_req: Request, res: Response) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

router.get('/getProduct/:id', Protect, async (req: any, res:any) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
});

router.put('/update/:id', Protect, async (req: any, res:any) => {
    const { id } = req.params;
    const { title, description, category, price, imageUrl } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await prisma.product.update({
        where: { id },
        data: { title, description, category, price: parseFloat(price), imageUrl },
    });
    res.json(updated);
});


router.get('/listings', Protect, async (req: any, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            where: { ownerId: req.user.userId },
            orderBy: { createdAt: "desc" },
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch listings." });
    }
});

router.get('/getAll', Protect, async (req: Request, res: Response) => {
    try {
        const { search, category } = req.query;

        const filters: any = {};

        if (search) {
            filters.title = { contains: String(search), mode: "insensitive" };
        }

        if (category) {
            filters.category = String(category);
        }

        const listings = await prisma.product.findMany({
            where: filters,
            orderBy: { createdAt: "desc" },
        });

        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch listings." });
    }
});
  
  

router.delete('/:id', async (req: any, res:any) => {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.product.delete({ where: { id } });
    res.json({ message: "Deleted successfully" });
});

export default router