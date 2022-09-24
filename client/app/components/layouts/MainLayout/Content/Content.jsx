import React from "react"

import styles from "./Content.module.scss";

const Content = ({ children }) => {
    return (
        <div className={styles.content}> {children} </div>
    );
}

export default React.memo(Content);