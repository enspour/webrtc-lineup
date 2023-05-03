import { useLayoutEffect } from "react"

const useScrollDownAtOpening = (ref) => {
    useLayoutEffect(() => {
        const target = ref.current;

        if (target) {
            target.scrollTo({
                top: target.scrollHeight,
            });
        }
    }, []);
}

export default useScrollDownAtOpening;