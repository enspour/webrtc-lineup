import React from "react";
import PropTypes from "prop-types";

import styles from "./OutlinedButton.module.scss";

const OutlinedButton = ({ children, onClick }) => {
    return (
        <button className={styles.btn} onClick={e => onClick(e)}> {children} </button>
    );
}

OutlinedButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default React.memo(OutlinedButton);