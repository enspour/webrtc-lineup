import { useEffect } from "react";

import services from "@services";

const useError = ({ error, response, isLoading, makeRequest }) => {
    useEffect(() => {
        if (!isLoading && error) {
            const { response } = error;
            services.notification.notify(response.data.message)
        }
    }, [isLoading]);
}

export default useError;