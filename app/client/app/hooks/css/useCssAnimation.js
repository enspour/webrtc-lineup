import React from "react";

const useCssAnimation = (style, conditional, deps) => {
    const ref = React.useRef();

    React.useEffect(() => {
        if (ref.current) {
            if (conditional) {
                ref.current.classList.add(style);
            } else {
                ref.current.classList.remove(style);
            }
        }
    }, deps);

    return ref;
}

export default useCssAnimation;

