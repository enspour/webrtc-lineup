import { useEffect } from "react";

import useChildrenObserver from "@hooks/useChildrenObserver";

const useScrollDownAtOpening = (ref) => {
    const { subscribe, unsubscribe } = useChildrenObserver(ref, scroll);
    
    function scroll (target) {
        unsubscribe();

        target.scrollTo({
            top: target.scrollHeight,
        })
    }

    useEffect(() => {
        const target = ref.current;
        
        if (target) {
            scroll(target)
        }
        
        subscribe();
        return () => unsubscribe();
    }, [ref]);
}

export default useScrollDownAtOpening;