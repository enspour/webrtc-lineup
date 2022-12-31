import ActionsService from "./Actions.service";
import RoomsService from "./Rooms.service";
import UsersService from "./Users.service";

const rooms = new RoomsService();

export default {
    rooms,
    actions: new ActionsService(rooms),
    users: new UsersService(),
}