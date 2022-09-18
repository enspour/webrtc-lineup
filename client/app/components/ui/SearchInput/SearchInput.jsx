import React from "react";

import Svg from "../Svg/Svg";

import SearchSVG from "@assets/images/search/search.svg";
import ClearSVG from "@assets/images/search/clear.svg";

import styles from "./SearchInput.module.scss";

const SearchInput = ({ placeholder, value, setValue, onClear }) => {
    return (
        <div className={styles.search}>
            <Svg url={SearchSVG} height="1.8" width="1.8"/>

            <input
                className={styles.search__input}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />
            <div className={styles.border}></div>
            <span className={styles.placeholder}> {placeholder} </span>

            <Svg url={ClearSVG} height="1.4" width="1.4" onClick={e => onClear(e)}/>
        </div>
    )
}

export default React.memo(SearchInput);