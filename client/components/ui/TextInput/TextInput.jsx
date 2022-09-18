import PropTypes from "prop-types";
import styles from "./TextInput.module.scss";

const TextInput = ({ type, placeholder, value, setValue }) => {
    return (
        <div className={styles.input}>
            <input 
                className={styles.text}
                type={type} 
                value={value}
                required
                onChange={(e) => setValue(e.target.value)}
            />
            <span className={styles.placeholder}> {placeholder} </span>
        </div>
    )
}

TextInput.propTypes = {
    type: PropTypes.oneOf(["text", "password"]).isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default TextInput;