import { Router } from "express";

import usersRoutes from "./users/users.route";

const router = Router();

router.use("/users", usersRoutes);

export default router;