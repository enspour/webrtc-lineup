import React from "react";
import PropTypes from "prop-types";

import styles from "./InputControl.module.scss";

const InputControl = ({ type, placeholder, value, setValue }) => {
    return (
        <div className={styles.input}>
            <input 
                className={styles.input__control}
                type={type} 
                value={value}
                required
                onChange={(e) => setValue(e.target.value)}
            />
            <span className={styles.placeholder}> {placeholder} </span>
        </div>
    )
}

InputControl.propTypes = {
    type: PropTypes.oneOf(["text", "password"]).isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default React.memo(InputControl);