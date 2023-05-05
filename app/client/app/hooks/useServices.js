import { useEffect } from "react";

import services from "@services";

const useServices = () => {
    useEffect(() => {
        const destroyer = services.initialize();
        return () => destroyer()
    }, []);
}

export default useServices;