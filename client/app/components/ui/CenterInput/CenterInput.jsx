import React from "react";
import PropTypes from "prop-types";

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

CenterInput.propTypes = {
    type: PropTypes.oneOf(["text", "password"]).isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}

export default React.memo(CenterInput);