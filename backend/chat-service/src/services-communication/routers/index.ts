import { Router } from "express";

import messageRoutes from "./message/message.route";

const router = Router();

router.use("/message", messageRoutes);

export default router;