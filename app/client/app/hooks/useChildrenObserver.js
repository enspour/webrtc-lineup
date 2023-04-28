import React from "react";

const config = {
    childList: true,
};

const useChildrenObserver = (ref, event) => {
    const observerRef = React.useRef();

    const subscribe = () => {
        if (ref.current && observerRef.current) {
            observerRef.current.observe(ref.current, config)
        }
    }

    const unsubscribe = () => {
        if (observerRef.current) {
            observerRef.current.disconnect()
        }
    }

    const callback = (mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                event(ref.current, unsubscribe);
            }
        }
    };

    React.useEffect(() => {
        if (ref.current) {
            observerRef.current = new MutationObserver(callback);
        }
    }, []);

    return { subscribe, unsubscribe };
}

export default useChildrenObserver;