import ActionsService from "./Actions.service";
import RoomsService from "./Rooms.service";

const rooms = new RoomsService();

export default {
    rooms,
    actions: new ActionsService(rooms),
}