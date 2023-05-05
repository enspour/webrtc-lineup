import { useEffect } from "react";

import useChildrenObserver from "@hooks/useChildrenObserver";

const useMessagesFollower = (ref) => {
    const { subscribe, unsubscribe } = useChildrenObserver(ref, scroll);
    
    function scroll(target) {
        target.scrollTo({
            top: target.scrollHeight,
            behavior: "smooth"    
        })
    }

    useEffect(() => {
        const current = ref.current;
        if (current) {
            const event = (e) => {
                const target = e.target;
                if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
                    subscribe();
                } else {
                    unsubscribe();
                }
            }

            current.addEventListener("scroll", event);

            return () => {
                unsubscribe();
                current?.removeEventListener("scroll", event);
            }
        }
    }, []);
}

export default useMessagesFollower;