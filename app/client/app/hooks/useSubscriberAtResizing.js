import { useEffect } from "react";

import useResizeObserver from "./useResizeObserver";

const useSubscriberAtResizing = (ref, callback) => {
    const { subscribe, unsubscribe } = useResizeObserver(ref, callback);

    useEffect(() => {
        subscribe();
        return () => unsubscribe();
    }, []);
}

export default useSubscriberAtResizing;