import React from "react";

import styles from "./Panel.module.scss";

const Panel = ({ 
    minHeight = "", 
    maxHeight = "", 
    height = "inherit",

    minWidth = "",
    maxWidth = "",
    width = "inherit",

    overflow = "auto",

    children 
}) => {
    return (
        <div 
            className={styles.panel}
            style={{
                ... minHeight ? { minHeight } : {},
                ... maxHeight ? { maxHeight } : {},
                ... minWidth ? { minWidth } : {},
                ... maxWidth ? { maxWidth } : {},

                height,
                width,

                overflow,
            }}    
        >
            { children }
        </div>
    )
}

export default React.memo(Panel);