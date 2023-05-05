import { useCallback, useEffect, useRef, useState } from "react";

const useResizeObserver = (ref, callback) => {
    const observerRef = useRef();

    const [isObserve, setIsObserve] = useState(false);

    const subscribe = () => {
        const target = ref.current;
        const observer = observerRef.current;

        if (target && observer) {
            observer.observe(target);
            setIsObserve(true);
        }
    }

    const unsubscribe = () => {
        const observer = observerRef.current;
        if (observer) {
            observer.disconnect();
            setIsObserve(false);
        }
    }
    
    const handle = useCallback(
        (entries) => callback(entries)
    , [callback]);

    useEffect(() => {
        const target = ref.current;

        if (target) {
            observerRef.current = new ResizeObserver(handle);
            if (isObserve) {
                subscribe();
            }

            return () => {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        }
    }, [ref, handle]);

    return { subscribe, unsubscribe }
}

export default useResizeObserver;