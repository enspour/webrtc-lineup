import React from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

import services from "@services";

const useLocalStorage = (key, initial) => {
    const [storageValue, setStorageValue] = React.useState(initial);

    const setValue = (value) => {
        let _value = typeof value === "function" ? value(storageValue) : value;
        
        services.localStorage.set(key, _value);
        setStorageValue(_value);
    }

    useIsomorphicLayoutEffect(() => {
        const value = services.localStorage.get(key);
        if (value) setStorageValue(value);
    }, []);
    
    return [storageValue, setValue];
}

export default useLocalStorage;