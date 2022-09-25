import React from "react";
import { useRouter } from "next/router";

import useRequest from "./useRequest"
import useResponse from "./useResponse"

import services from "@services"

const useLogout = () => {
    const request = useRequest(services.authAPI.logout);
    const { data } = useResponse(request);

    const router = useRouter()

    React.useEffect(() => {
        if (data) router.push("/login")
    }, [data])

    return () => request.start({})
}

export default useLogout;