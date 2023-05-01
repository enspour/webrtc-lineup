import { useEffect } from "react";
import { autorun } from "mobx";

import services from "@services";

const useLoaderUserStores = () => {
    useEffect(() => {
        const cleaner = autorun(() => {
            const userId = services.user.Info.Id;
            if (userId) {
                services.userCreatedRooms.update();
                services.userFavoritesRooms.update();
            }
        })

        return () => {
            services.userCreatedRooms.clear();
            services.userFavoritesRooms.clear();

            cleaner();
        }
    }, []);
}

export default useLoaderUserStores;