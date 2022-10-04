import React from "react";

import services from "@services";

const useLoaderStore = () => {
    React.useEffect(() => {
        services.userRooms.update();
        services.favoritesRooms.update();

        return () => {
            services.userRooms.clear();
            services.favoritesRooms.clear();
        }
    }, []);
}

export default useLoaderStore;