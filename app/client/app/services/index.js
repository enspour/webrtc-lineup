import { io } from "socket.io-client"

import ContextMenuService from "./ContextMenu.service";
import ModalsService from "./Modals.service";
import StorageService from "./Storage.service";

import { NotificationService } from "@features/notifications";
import { UserService } from "@features/user";
import { IslandService } from "@features/island";
import { RoomService } from "@features/room";
import { ConferenceService } from "@features/conference";

const socket = io({ 
    path: "/api/v1/signal-service/socket/socket.io", 
    autoConnect: false
});

class Services {
    constructor() {
        this.localStorage = new StorageService(this);
        this.sessionStorage = new StorageService(this);

        this.modals = new ModalsService(this);
        this.contextMenu = new ContextMenuService(this);
        this.notification = new NotificationService(this);

        this.user = new UserService(this);
        this.island = new IslandService(this);
        this.room = new RoomService(this, socket);
        this.conference = new ConferenceService(this, socket);
    }

    initialize() {
        const localStorageDestroyer = this.localStorage.initialize("local");
        const sessionStorageDestroyer = this.sessionStorage.initialize("session");

        const modalsDestroyer = this.modals.initialize();
        const contextMenuDestroyer = this.contextMenu.initialize();
        const notificationDestroyer = this.notification.initialize();

        const islandDestroyer = this.island.initialize();
        const userDestroyer = this.user.initialize();
        const roomDestroyer = this.room.initialize();
        const conferenceDestroyer = this.conference.initialize();

        return () => {
            localStorageDestroyer();
            sessionStorageDestroyer();

            modalsDestroyer();
            contextMenuDestroyer();
            notificationDestroyer();
            
            userDestroyer();
            islandDestroyer();
            roomDestroyer();
            conferenceDestroyer();
        }
    }
}

export default new Services();