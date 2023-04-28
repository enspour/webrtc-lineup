import React from "react";
import PropTypes from "prop-types";

import styles from "./OutlinedButton.module.scss";

const OutlinedButton = ({ onClick, height, children }) => {
    return (
        <button 
            className={styles.btn} 
            style={{ height }}
            onClick={e => onClick(e)}
        > 
            {children} 
        </button>
    );
}

OutlinedButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default React.memo(OutlinedButton);