import PropTypes from "prop-types";
import styles from "./FilledButton.module.scss";

const FilledButton = ({ value, onClick }) => {
    return (
        <button className={styles.btn} onClick={e => onClick(e)}> {value} </button>
    );
}

FilledButton.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default FilledButton;