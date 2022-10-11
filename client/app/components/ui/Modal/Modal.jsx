import React from "react";
import PropTypes from "prop-types";

import Panel from "../Panel/Panel";

import useCssAnimation from "@hooks/css/useCssAnimation";

import styles from "./Modal.module.scss";

const Modal = ({ title, isOpen, setIsOpen, children }) => {
    const modalRef = useCssAnimation(styles.visible, isOpen, [isOpen]);
    
    const modalContentRef = React.useRef();

    const closeModal = e => {
        if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    return (
        <div className={styles.modal} ref={modalRef} onClick={closeModal}>
            <div className={styles.modal__content} ref={modalContentRef}>
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

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
}

export default React.memo(Modal);