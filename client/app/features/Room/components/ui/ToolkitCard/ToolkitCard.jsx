import React from "react";

import Panel from "@components/ui/Panel/Panel";

import styles from "./ToolkitCard.module.scss";

const ToolkitCard = ({ title, hint, onClick }) => {
    return (
        <div className={styles.toolkit} onClick={onClick}>
            <Panel height="12.5rem" width="30rem" overflow="hidden">
                <div className={styles.toolkit__wrapper}>
                    <div className={styles.toolkit__title}>{ title }</div>
                    <div className={styles.toolkit__hint}>{ hint } </div>
                </div>
            </Panel>
        </div>
    )
}

export default React.memo(ToolkitCard);