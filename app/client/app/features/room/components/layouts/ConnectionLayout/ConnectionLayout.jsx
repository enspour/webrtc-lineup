import React from "react";
import { useRouter } from "next/router";

import Loader from "@components/ui/Loader/Loader";

import services from "@services";

const ConnectionLayout = ({ children }) => {
    const router = useRouter();

    React.useEffect(() => {
        if (!services.room.Connected) {
            router.push("/");
        }
    }, [])

    if (!services.room.Connected) {
        return (
            <div className="h-100vh">
                <Loader />
            </div>
        );
    }

    return children;
}

export default React.memo(ConnectionLayout);