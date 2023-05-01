import { useEffect } from "react";

import services from "@services";

const useLoaderServices = () => {
    useEffect(() => {
        const destroyer = services.initialize();
        return () => destroyer()
    }, []);
}

export default useLoaderServices;