import React from "react";
import { useRouter } from "next/router";

import AuthAPI from "@api/AuthAPI";

import useRequest from "./useRequest"
import useResponse from "./useResponse"

const useLogout = () => {
    const request = useRequest(AuthAPI.logout);
    const { data } = useResponse(request);

    const router = useRouter()

    React.useEffect(() => {
        if (data) router.push("/login")
    }, [data])

    return () => request.start({})
}

export default useLogout;