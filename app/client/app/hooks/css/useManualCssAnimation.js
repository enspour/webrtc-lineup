const useManualCssAnimation = (ref, style) => {
    const add = (delay) => {
        const target = ref.current;

        if (target) {
            if (delay) {
                setTimeout(() => {
                    target.classList.add(style);
                }, delay);
            } else {
                target.classList.add(style);
            }
        }
    }

    const remove = (delay) => {
        const target = ref.current;
        
        if (target) {
            if (delay) {
                setTimeout(() => {
                    ref.current.classList.remove(style);
                }, delay);
            } else {
                ref.current.classList.remove(style);
            }
        }
    }

    return [add, remove];
}

export default useManualCssAnimation;