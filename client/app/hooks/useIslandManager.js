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
    const [history, setHistory] = useLocalStorage("__tab_history", [1, 1]); // [current, previous]

    const currentId = React.useMemo(() => history[0], [history]);
    const component = React.useMemo(() => items.find(item => item.id === history[0]).component, [history]);

    const setCurrentId = (id) => {
        if (typeof id === "function") id = id(history[0]);

        if (history[0] !== id) {
            setHistory([ id, history[0] ]);
        }
    }

    const undo = () => {
        setCurrentId(history[1]);
    }

    return {
        currentId,
        setCurrentId, 
        tabs,
        searchTab,
        component,
        undo
    }
}

export default useIslandManager;