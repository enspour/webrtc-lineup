import React from "react";

import styles from "./SimpleInput.module.scss";

const SimpleInput = ({ value, setValue, placeholder }) => {
    return (
        <input 
            className={styles.input} 
            type="text" 
            placeholder={placeholder}
            value={value} 
            onChange={e => setValue(e.target.value)} 
        />
    )
}

export default React.memo(SimpleInput);