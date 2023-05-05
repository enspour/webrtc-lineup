import IslandStore from "../stores/Island.store";

import IslandTabsService from "./IslandTabs.service";
import IslandSearchService from "./IslandSearch.service";

export default class IslandService {
    #islandStore;
    
    #islandTabs;
    #islandSearch;

    constructor({ localStorage }) {
        this.#islandStore = new IslandStore();

        this.#islandTabs = new IslandTabsService(localStorage, this.#islandStore);
        this.#islandSearch = new IslandSearchService(localStorage);
    }

    initialize() {
        const islandTabsDestroyer = this.#islandTabs.initialize();
        const islandSearchDestroyer = this.#islandSearch.initialize();

        return () => {
            islandTabsDestroyer();
            islandSearchDestroyer();
        };
    }

    get Tabs() {
        return this.#islandTabs;
    }

    get Search() {
        return this.#islandSearch;
    }
}