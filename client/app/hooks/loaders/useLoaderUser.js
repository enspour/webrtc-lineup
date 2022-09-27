import React from "react";

import useRequest from "@hooks/useRequest";
import useResponse from "@hooks/useResponse";

import services from "@services";

const useLoaderUser = () => {
    const request = useRequest(services.authAPI.me);
    const { data } = useResponse(request);
    
    React.useEffect(() => {
        request.start();
    }, [])

    React.useEffect(() => {
        if (data) {
            services.user.User = data.body.user
        }
    }, [data])
}

export default useLoaderUser;