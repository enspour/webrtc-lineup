import React from "react";

import styles from "./CenterInput.module.scss";

const CenterInput = ({ type, placeholder, value, setValue }) => {
    return (
        <input 
            className={styles.input} 
            type={type}
            placeholder={placeholder}
            value={value} 
            onChange={e => setValue(e.target.value)} 
        />
    )
}

export default React.memo(CenterInput);