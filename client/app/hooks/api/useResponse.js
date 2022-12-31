import React from "react";

const useResponse = ({ error, response, isLoading, makeRequest }) => {
    const [data, setData] = React.useState(null); 

    React.useEffect(() => {
        if (
            !isLoading 
            && response 
            && (response.status === 200 || response.status === 201)
        ) {
            setData(response.data); 
        } 
    }, [isLoading]);

    return { data }
}

export default useResponse;