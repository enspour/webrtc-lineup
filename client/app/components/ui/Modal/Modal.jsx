import React from "react";

import Panel from "../Panel/Panel";

import useCssAnimation from "@hooks/css/useCssAnimation";

import styles from "./Modal.module.scss";

const Modal = ({ title, visible, setVisible, children }) => {
    const windowRef = useCssAnimation(styles.visible, visible, [visible]);

    return (
        <div className={styles.window} ref={windowRef}>
            <div className={styles.modal}>
                <Panel>
                    <div className={styles.wrapper}>
                        <div className={styles.modal__title}>{title}</div>
                        <div className={styles.modal__body}>
                            {children}
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    );
}

export default React.memo(Modal);