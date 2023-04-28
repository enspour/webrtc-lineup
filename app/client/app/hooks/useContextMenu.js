import React from "react";

import services from "@services";

const useContextMenu = () => {
    const ref = React.useRef();
    const mapRef = React.useRef(new Map())

    const append = (...items) => items.forEach(item => mapRef.current.set(item.id, item));

    const clickOutside = e => {  
        if (ref.current && !ref.current.contains(e.target)) {
            services.contextMenu.setIsOpen(false);
        }
    }

    React.useEffect(() => {
        document.addEventListener("click", clickOutside);
        return () => document.removeEventListener("click", clickOutside);
    }, []);

    React.useEffect(() => {
        const contextmenu = ref.current;

        if (contextmenu) {
            const event = e => {
                e.preventDefault();

                const coordinates = { x: e.pageX, y: e.pageY };

                services.contextMenu.setMenu(Array.from(mapRef.current.values()));
                services.contextMenu.setCoordinates(coordinates);
                services.contextMenu.setIsOpen(true);
            }
    
            contextmenu.addEventListener("contextmenu", event);
            
            return () => contextmenu.removeEventListener("contextmenu", event);
        }
    }, []);

    return [ref, append]
}

export default useContextMenu; 