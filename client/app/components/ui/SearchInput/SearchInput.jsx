import React from "react";

import Svg from "../Svg/Svg";

import ClearSVG from "@assets/images/search/clear.svg";

import styles from "./SearchInput.module.scss";

const SearchInput = ({ placeholder, value, setValue }) => {
    return (
        <div className={styles.search}>
            <input
                className={styles.search__input}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />

            <Svg url={ClearSVG} height="1.4" width="1.4" onClick={() => setValue("")}/>
        </div>
    )
}

export default React.memo(SearchInput);