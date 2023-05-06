import ChannelsService from "./Channels.service";
import UsersService from "./Users.service";

export default {
    channels: new ChannelsService(),
    users: new UsersService(),
}