import { Router, type Request, type Response } from "express";

import authRoutes from "./authRoutes.js";
import jobRoutes from "./jobRoutes.js";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "mini-service-board-api",
  });
});

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);

export default router;
