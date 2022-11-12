import PropTypes from "prop-types";

import styles from "./InputButtonGroup.module.scss";

const InputButtonGroup = ({ value, setValue, type, placeholder, onClick, children }) => {
    return (
        <div className={styles.wrapper}>
            <input 
                className={styles.input} 
                type={type}
                placeholder={placeholder}
                value={value} 
                onChange={e => setValue(e.target.value)} 
            />

            <button className={styles.btn} onClick={onClick}> {children} </button>
        </div>
    )
}

InputButtonGroup.propTypes = {
    type: PropTypes.oneOf(["text", "password"]).isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
}

export default InputButtonGroup;