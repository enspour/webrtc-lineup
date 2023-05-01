import { useLayoutEffect } from "react"

const useScrollDownAtOpening = (ref) => {
    useLayoutEffect(() => {
        const target = ref.current;

        if (target) {
            target.scrollIntoView();
        }
    }, [])
}

export default useScrollDownAtOpening