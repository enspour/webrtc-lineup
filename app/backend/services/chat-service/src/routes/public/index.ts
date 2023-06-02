import { Router } from "express";

import messagesRoutes from "./messages/messages.route";

const router = Router();

router.use("/messages", messagesRoutes);

export default router;