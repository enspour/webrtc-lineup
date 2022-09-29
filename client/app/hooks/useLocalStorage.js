import React from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

import services from "@services";

const useLocalStorage = (key, initial) => {
    const [storagedValue, setStoragedValue] = React.useState(initial);

    const setValue = (value) => {
        let _value = typeof value === "function" ? value(storagedValue) : value;
        
        services.localStorage.set(key, _value);
        setStoragedValue(_value);
    }

    useIsomorphicLayoutEffect(() => {
        const value = services.localStorage.get(key);
        if (value) setStoragedValue(value);
    }, []);
    
    return [storagedValue, setValue];
}

export default useLocalStorage;