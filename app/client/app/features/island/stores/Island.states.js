import Store from "../components/tabs/Store/Store";
import Favorites from "../components/tabs/Favorites/Favorites";
import Search from "../components/tabs/Search/Search";
import services from "@services";

export const IslandStoreTab = { 
    id: 1, 
    name: "Store", 
    component: <Store />,
    open: () => {
        services.island.Tabs.openStore();
    }
};

export const IslandFavoritesTab = { 
    id: 2, 
    name: "Favorites", 
    component: <Favorites />,
    open: () => {
        services.island.Tabs.openFavorites();
    }
};

export const IslandSearchTab = { 
    id: 3, 
    name: "Search", 
    component: <Search />,
    open: () => {
        services.island.Tabs.openSearch();
    }
}

export const IslandViewTabs = [
    IslandStoreTab,
    IslandFavoritesTab
];

export const IslandTabs = [
    IslandStoreTab,
    IslandFavoritesTab,
    IslandSearchTab,
]