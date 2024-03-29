import { useEffect, useState, useRef, useCallback } from "react";

const config = {
    childList: true,
};

const useChildrenObserver = (ref, callback) => {
    const observerRef = useRef();

    const [isObserve, setIsObserve] = useState(false);

    const subscribe = () => {
        const target = ref.current;
        const observer = observerRef.current;

        if (target && observer) {
            observer.observe(target, config);
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
        (mutations) => {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    callback(ref.current);
                }
            }
        }
    , [callback])

    useEffect(() => {
        const target = ref.current;

        if (target) {
            observerRef.current = new MutationObserver(handle);
            if (isObserve) {
                subscribe();
            }

            return () => {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        }
    }, [ref, handle]);

    return { subscribe, unsubscribe };
}

export default useChildrenObserver;