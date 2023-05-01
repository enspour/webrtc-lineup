import { useEffect, memo } from "react";
import { useRouter } from "next/router";

import Loader from "@components/ui/Loader/Loader";

import services from "@services";

const ConnectionLayout = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        if (!services.conference.Connected) {
            router.push("/");
        }
    }, [])

    if (!services.conference.Connected) {
        return ( 
            <div className="h-100vh">
                <Loader />
            </div>
        )
    }

    return children;
}

export default memo(ConnectionLayout);