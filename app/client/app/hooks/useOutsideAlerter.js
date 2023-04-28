import React from 'react'

const useOutsideAlerter = (initial) => {
    const ref = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(initial);

    const clickOutside = e => {  
        if (ref.current && !ref.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    React.useEffect(() => {
        document.addEventListener("click", clickOutside);
        return () => document.removeEventListener("click", clickOutside);
    }, []);

    return [ref, isOpen, setIsOpen];
}

export default useOutsideAlerter;