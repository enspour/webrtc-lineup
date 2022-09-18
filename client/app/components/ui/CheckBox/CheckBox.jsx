import React from "react";

import styles from "./CheckBox.module.scss";

const CheckBox = ({ label, setValue }) => {
    return (
        <div>
            <label className={styles.wrapper}>
                <input type="checkbox" className={styles.input} onClick={e => setValue(e.target.checked)}/>
                <span className={styles.checkbox}></span>
                <span className={styles.label}>{label}</span>
            </label>
        </div>
    )
}

export default React.memo(CheckBox);