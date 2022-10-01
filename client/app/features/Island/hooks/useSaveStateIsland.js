import React from "react";
import { autorun } from "mobx";

import services from "@services";

const useSaveStateIsland = () => {
    const history = services.island.History;

    React.useEffect(() => {
        const _history = services.localStorage.get("__tab_history");
        if (_history) {
            services.island.History = _history;
        }
    }, [])

    React.useEffect(
        () => 
            autorun(() => {
                if (history) {
                    services.localStorage.set("__tab_history", history);
                }
            })
        , [history]
    )
}

export default useSaveStateIsland;