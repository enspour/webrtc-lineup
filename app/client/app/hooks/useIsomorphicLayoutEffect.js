import { useLayoutEffect, useEffect } from "react";

const useIsomorphicLayoutEffect = (effect, deps) => {
    const canUseDOM = typeof window !== 'undefined';

    const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

    useIsomorphicLayoutEffect(effect, deps);
}

export default useIsomorphicLayoutEffect;