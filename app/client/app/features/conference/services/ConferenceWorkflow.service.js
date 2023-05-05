import { autorun } from "mobx";

import SidebarService from "./Sidebar.service";

export default class ConferenceWorkflowService {
    #conferenceStore;

    #leftSidebar;
    #rightSidebar;

    #typeMain;

    constructor(conferenceStore) {
        this.#conferenceStore = conferenceStore;
        
        this.#leftSidebar = new SidebarService();
        this.#rightSidebar = new SidebarService();
    }

    initialize() {
        const watcherTypeMainDestroyer = autorun(() => {
            const settings = this.#conferenceStore.settings;
            
            if (settings.enableVideo) {
                return this.#typeMain = "video";
            }
            
            if (settings.enableAudio) {
                return this.#typeMain = "audio";
            }

            return this.#typeMain = "chat";
        })

        const leftSidebarDestroyer = this.#leftSidebar.initialize();
        const rightSidebarDestroyer = this.#rightSidebar.initialize();

        return () => {
            watcherTypeMainDestroyer();

            leftSidebarDestroyer();
            rightSidebarDestroyer();
        }
    }

    get IsOpenLS() {
        return this.#leftSidebar.IsOpen;
    }

    get IsOpenRS() {
        return this.#rightSidebar.IsOpen;
    }
    
    get TypeLS() {
        return this.#leftSidebar.Type;
    }

    get TypeRS() {
        return this.#rightSidebar.Type;
    }

    get TypeMain() {
        return this.#typeMain;
    }

    openLS(type) {
        if (type === this.TypeMain) {
            return;
        }

        if (type === this.TypeRS) {
            this.#rightSidebar.close();
        }

        if (type !== this.TypeLS) {
            this.#leftSidebar.setType(type);
        }

        this.#leftSidebar.open(type);
    }

    openRS(type) {
        if (type === this.TypeMain) {
            return;
        }

        if (type === this.TypeLS) {
            this.#leftSidebar.close();
        }

        if (type !== this.TypeRS) {
            this.#rightSidebar.setType(type);
        }
        
        this.#rightSidebar.open();
    }

    closeLS() {
        this.#leftSidebar.close();
    }

    closeRS() {
        this.#rightSidebar.close();
    }
}