import React from "react";

import useRequest from "@hooks/useRequest";
import useResponse from "@hooks/useResponse";
import services from "@services";

const Store = () => {
    // const request = useRequest(services.roomAPI.getCreated);
    // const { data } = useResponse(request);

    // React.useEffect(() => {
    //     request.start({});
    // }, [])

    // React.useEffect(() => {
    //     console.log(data);
    // }, [data])


    // if (request.isLoading) {
    //     return <div className="loader"></div>
    // }

    return <div> store </div>
}

export default Store;