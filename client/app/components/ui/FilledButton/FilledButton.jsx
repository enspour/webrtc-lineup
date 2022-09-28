import React from "react";
import PropTypes from "prop-types";

import styles from "./FilledButton.module.scss";

const FilledButton = ({ children, onClick }) => {
    return (
        <button className={styles.btn} onClick={e => onClick(e)}> {children} </button>
    );
}

FilledButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default React.memo(FilledButton);