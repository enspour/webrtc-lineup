import { useEffect, useRef } from "react";

import services from "@services";

const useContextMenu = () => {
    const ref = useRef();
    const mapRef = useRef(new Map())

    const append = (...items) => items.forEach(item => mapRef.current.set(item.id, item));

    const clickOutside = e => {  
        if (ref.current && !ref.current.contains(e.target)) {
            services.contextMenu.setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", clickOutside);
        return () => document.removeEventListener("click", clickOutside);
    }, []);

    useEffect(() => {
        const target = ref.current;

        if (target) {
            const event = e => {
                e.preventDefault();

                const coordinates = { x: e.pageX, y: e.pageY };

                services.contextMenu.setMenu(Array.from(mapRef.current.values()));
                services.contextMenu.setCoordinates(coordinates);
                services.contextMenu.setIsOpen(true);
            }
    
            target.addEventListener("contextmenu", event);
            
            return () => target.removeEventListener("contextmenu", event);
        }
    }, []);

    return [ref, append]
}

export default useContextMenu; 