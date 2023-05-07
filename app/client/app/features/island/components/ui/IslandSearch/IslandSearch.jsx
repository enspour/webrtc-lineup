import { memo } from "react";

import IslandSearchInput from "./IslandSearchInput";
import IslandSearchHistory from "./IslandSearchHistory";

import useOutsideAlerter from "@hooks/useOutsideAlerter";

import styles from "./IslandSearch.module.scss";

const IslandSearch = () => {
    const [ref, isOpen, setIsOpen] = useOutsideAlerter(false);

    return (
        <div ref={ref} className={styles.search} onClick={() => setIsOpen(true)}>
            <IslandSearchInput placeholder="Search" />
            <IslandSearchHistory isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default memo(IslandSearch);