import { Router } from "express";

import roomRoutes from "./room/room.route";

const router = Router();

router.use("/room", roomRoutes);

export default router;