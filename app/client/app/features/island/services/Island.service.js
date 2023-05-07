import IslandStore from "../stores/Island.store";

import IslandTabsService from "./IslandTabs.service";
import SearchService from "./Search.service";

export default class IslandService {
    #islandStore;
    
    #islandTabs;
    
    #search;

    constructor({ localStorage }) {
        this.#islandStore = new IslandStore();

        this.#islandTabs = new IslandTabsService(localStorage, this.#islandStore);
        
        this.#search = new SearchService(localStorage);
    }

    initialize() {
        const islandTabsDestroyer = this.#islandTabs.initialize();

        const searchDestroyer = this.#search.initialize();

        return () => {
            islandTabsDestroyer();
            searchDestroyer();
        };
    }

    get Tabs() {
        return this.#islandTabs;
    }

    get Search() {
        return this.#search;
    }
}