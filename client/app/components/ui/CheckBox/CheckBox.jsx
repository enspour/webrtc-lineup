import React from "react";

import styles from "./CheckBox.module.scss";

const CheckBox = ({ label, value, setValue }) => {
    return (
        <div>
            <label className={styles.wrapper}>
                <input 
                    type="checkbox" 
                    className={styles.input} 
                    checked={value}
                    onChange={e => setValue(e.target.checked)}
                />
                <span className={styles.checkbox}></span>
                <span className={styles.label}>{label}</span>
            </label>
        </div>
    )
}

export default React.memo(CheckBox);