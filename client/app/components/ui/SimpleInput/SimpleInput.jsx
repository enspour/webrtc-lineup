import React from "react";
import PropTypes from "prop-types";

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

SimpleInput.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}

export default React.memo(SimpleInput);