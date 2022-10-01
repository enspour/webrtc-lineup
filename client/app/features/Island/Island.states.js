import Store from "@components/pages/index/Store/Store";
import Favorites from "@components/pages/index/Favorites/Favorites";
import Search from "@components/pages/index/Search/Search";

export const IslandViewTabs = [
    { id: 1, name: "Store", component: <Store /> },
    { id: 2, name: "Favorites", component: <Favorites /> },
];

export const IslandSearchTab = { id: 3, name: "Search", component: <Search /> }

export const IslandTabs = [
    ...IslandViewTabs,
    IslandSearchTab,
]