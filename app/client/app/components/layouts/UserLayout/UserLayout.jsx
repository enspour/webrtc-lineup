import { useEffect, memo } from "react";

import services from "@services";

const UserLayout = ({ children }) => {
    useEffect(() => {
        services.user.Info.update();
        services.user.CreatedRooms.update();
        services.user.FavoritesRooms.update();

        return () => {
            services.user.CreatedRooms.clear();
            services.user.FavoritesRooms.clear();
        }
    }, []);

    return children;
}

export default memo(UserLayout);