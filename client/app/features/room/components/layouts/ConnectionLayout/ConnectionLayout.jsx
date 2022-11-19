import React from "react";
import { useRouter } from "next/router";

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
            <div className="h-100vh w-100 fl al-center jf-center">
                <div className="loader"></div>
            </div>
        );
    }

    return children;
}

export default React.memo(ConnectionLayout);