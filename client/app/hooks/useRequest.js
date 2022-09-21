import React from "react";

import services from "@services";

export const Actions = {
    LOGIN: () => services.authAPI.createLoginRequest(),
}

const useRequest = (action) => {
    const [ isLoading, setIsLoading ] = React.useState(false);

    const error = React.useRef(null);
    const request = React.useRef(null);
    const response = React.useRef(null);
    const countRequests = React.useRef(0);

    const make = async (data) => {
        if (!request.current) {
            request.current = action();
        }

        request.current.start(data);
        countRequests.current += 1;

        setIsLoading(true);

        try {
            response.current = await request.current.wait();
            error.current = null;
            countRequests.current -= 1;
            setIsLoading(false);
        } catch (err) {
            countRequests.current -= 1;
            if (countRequests.current === 0) {

                if (err.response && err.response.status === 401) {
                    const res = await services.authAPI.refresh();
                    if (res.status === 200) {
                        return make(data);
                    }
                }

                error.current = err;
                setIsLoading(false);
            }
        }
    } 

    return {
        error: error.current,
        response: response.current,
        isLoading,
        make,
    }
}

export default useRequest;