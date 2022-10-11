import React from "react";

import services from "@services";

const useLoaderUser = () => {
    React.useEffect(() => {
        services.user.update();
    }, []);
}

export default useLoaderUser;