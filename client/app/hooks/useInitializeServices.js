import React from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

import services from "@services";

const useInitializeServices = () => {
    const isInitRef = React.useRef(false); 

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined' && !isInitRef.current) {
            services.initialize();
            isInitRef.current = true;
        }
    }, []); 
}

export default useInitializeServices;