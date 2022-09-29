import React from "react";

import Panel from "../Panel/Panel";

import useCssAnimation from "@hooks/css/useCssAnimation";

import styles from "./Modal.module.scss";

const Modal = ({ title, isOpen, setIsOpen, children }) => {
    const windowRef = useCssAnimation(styles.visible, isOpen, [isOpen]);
    
    const modalRef = React.useRef();

    const closeModal = e => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    return (
        <div className={styles.window} ref={windowRef} onClick={closeModal}>
            <div className={styles.modal} ref={modalRef}>
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