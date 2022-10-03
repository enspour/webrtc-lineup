import React from "react";

import services from "@services";

const useRequest = (requestMethod) => {
    const [ isLoading, setIsLoading ] = React.useState(false);
   
    const request = React.useRef(services.API.createRequest(requestMethod));

    React.useEffect(() => {
        return request.current.onStart(() => { setIsLoading(true); });
    }, []);

    React.useEffect(() => {
        return request.current.onResponse(() => { setIsLoading(false); });
    }, []);

    React.useEffect(() => {
        return request.current.onError(() => { setIsLoading(false) });
    }, []); 

    return {
        start: request.current.start.bind(request.current),
        error: request.current.error,
        response: request.current.response,
        isLoading,
    }
}

export default useRequest;