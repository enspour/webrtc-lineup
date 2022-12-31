import Store from "@components/screens/island/Store/Store";
import Favorites from "@components/screens/island/Favorites/Favorites";
import Search from "@components/screens/island/Search/Search";

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