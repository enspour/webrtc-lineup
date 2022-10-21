import React from "react";
import { autorun } from "mobx";

import services from "@services";

const useLoaderStore = () => {
    React.useEffect(() => 
        autorun(() => {
            const userId = services.user.Id;
            if (userId) {
                services.userRooms.update();
                services.userFavoritesRooms.update();
            }
        })
    , []);
}

export default useLoaderStore;