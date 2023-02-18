import React from "react";
import { autorun } from "mobx";

import services from "@services";

const useLoaderUserStores = () => {
    React.useEffect(() => {
        const cleaner = autorun(() => {
            const userId = services.user.Id;
            if (userId) {
                services.userRooms.update();
                services.userFavoritesRooms.update();
            }
        })

        return () => {
            services.userRooms.clear();
            services.userFavoritesRooms.clear();

            cleaner();
        }
    }, []);
}

export default useLoaderUserStores;