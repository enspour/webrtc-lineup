import Store from "../components/ui/Store/Store";
import Favorites from "../components/ui/Favorites/Favorites";
import Search from "../components/ui/Search/Search";

export const IslandStoreTab = { id: 1, name: "Store", component: <Store /> };
export const IslandFavoritesTab = { id: 2, name: "Favorites", component: <Favorites /> };
export const IslandSearchTab = { id: 3, name: "Search", component: <Search /> }

export const IslandViewTabs = [
    IslandStoreTab,
    IslandFavoritesTab
];

export const IslandTabs = [
    IslandStoreTab,
    IslandFavoritesTab,
    IslandSearchTab,
]