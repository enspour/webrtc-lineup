import React from "react";
import PropTypes from "prop-types";

import styles from "./CheckBox.module.scss";

const CheckBox = ({ label, value, setValue }) => {
    return (
        <div className={styles.container}>
            <label className={styles.wrapper}>
                <input 
                    type="checkbox" 
                    className={styles.input} 
                    checked={value}
                    onChange={e => setValue(e.target.checked)}
                />
                <div className={styles.checkbox}></div>
                <div className={styles.label}>{label}</div>
            </label>
        </div>
    )
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default React.memo(CheckBox);