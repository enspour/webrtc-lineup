import PropTypes from "prop-types";
import styles from "./OutlinedButton.module.scss";

const OutlinedButton = ({ value, onClick }) => {
    return (
        <button className={styles.btn} onClick={e => onClick(e)}> {value} </button>
    );
}

OutlinedButton.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default OutlinedButton;