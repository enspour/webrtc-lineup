import React from "react";
import { autorun } from "mobx";

import services from "@services";

const useSaveStateIsland = () => {
    React.useEffect(() => {
        const _history = services.localStorage.get("__tab_history");
        if (_history) {
            services.island.History = _history;
        }
    }, [])

    React.useEffect(
        () => 
            autorun(() => {
                const history = services.island.History;

                if (history && history[0] !== history[1]) {
                    services.localStorage.set("__tab_history", history);
                }
            })
        , []
    )
}

export default useSaveStateIsland;