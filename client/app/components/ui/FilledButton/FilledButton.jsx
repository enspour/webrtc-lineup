import React from "react";
import PropTypes from "prop-types";

import styles from "./FilledButton.module.scss";

const FilledButton = ({ onClick, height = "4rem", children }) => {
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

FilledButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default React.memo(FilledButton);