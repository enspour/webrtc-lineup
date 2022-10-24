import RoomsService from "./Rooms.service";
import ClientService from "./Clients.service";

const rooms = new RoomsService();

export default {
    rooms,
    clients: new ClientService(rooms),
}