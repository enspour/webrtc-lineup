import { useLayoutEffect, useEffect, useRef } from "react";

import services from "@services";

const useInitializeServices = () => {
    const isInitRef = useRef(false);

    const canUseDOM = typeof window !== 'undefined';

    const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined' && !isInitRef.current) {
            services.initialize();
            isInitRef.current = true;
        }
    }, []); 
}

export default useInitializeServices;