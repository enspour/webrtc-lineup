import React from "react";

import Favorites from "@components/pages/index/Favorites/Favorites";
import Search from "@components/pages/index/Search/Search";
import Store from "@components/pages/index/Store/Store";

import useLocalStorage from "./useLocalStorage";

const tabs = [
    { id: 1, name: "Store", component: <Store /> },
    { id: 2, name: "Favorites", component: <Favorites /> },
];

const searchTab = { id: 3, name: "Search", component: <Search /> }

const items = [
    ...tabs,
    searchTab,
]

const useIslandManager = () => {
    const [activeTabId, setActiveTabId] = useLocalStorage("__tab", 1);

    const previousTabIds = React.useRef([1, 1]);

    const component = React.useMemo(() => items.find(item => item.id === activeTabId).component, [activeTabId]);

    const undo = () => {
        setActiveTabId(previousTabIds.current[1]);
    }

    React.useEffect(() => {
        previousTabIds.current = [ activeTabId, previousTabIds.current[0] ];
    }, [activeTabId])

    return {
        activeTabId,
        setActiveTabId, 
        tabs,
        searchTab,
        component,
        undo
    }
}

export default useIslandManager;