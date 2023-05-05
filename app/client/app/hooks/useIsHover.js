import { useEffect, useState } from "react";

const useIsHover = (ref) => {
    const [isHover, setIsHover] = useState(false);

    const over = () => setIsHover(true);
    const out = () => setIsHover(false);

    useEffect(() => {
        const element = ref.current;

        if (element) {
            element.addEventListener("mouseover", over);
            element.addEventListener("mouseout", out);

            return () => {
                element.removeEventListener("mouseover", over);
                element.removeEventListener("mouseout", out);
            };
        }
    }, [ref]);

    return isHover;
};

export default useIsHover;