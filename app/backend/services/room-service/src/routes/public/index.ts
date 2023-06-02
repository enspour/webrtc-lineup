import { Router } from "express";

import roomRoutes from "./room/room.route";
import roomsRoutes from "./rooms/rooms.route";
import conferenceRoutes from "./conference/conference.route";
import conferencesRoutes from "./conferences/conferences.route";

const router = Router();

router.use("/room", roomRoutes);
router.use("/rooms", roomsRoutes);
router.use("/conference", conferenceRoutes);
router.use("/conferences", conferencesRoutes);

export default router;