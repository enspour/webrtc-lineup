const useManualCssAnimation = (ref, style) => {
    const add = (delay) => {
        if (delay) {
            setTimeout(() => {
                ref.current.classList.add(style);
            }, delay);
        } else {
            ref.current.classList.add(style);
        }
    }

    const remove = (delay) => {
        if (delay) {
            setTimeout(() => {
                ref.current.classList.remove(style);
            }, delay);
        } else {
            ref.current.classList.remove(style);
        }
    }

    return [add, remove];
}

export default useManualCssAnimation;