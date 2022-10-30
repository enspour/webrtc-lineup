import React from "react";
import PropTypes from "prop-types";

import Panel from "../Panel/Panel";

import useCssAnimation from "@hooks/css/useCssAnimation";

import Svg from "../Svg/Svg";

import CloseIcon from "@assets/images/modal/close.svg";

import styles from "./Modal.module.scss";

const Modal = ({ title, isOpen, setIsOpen, children }) => {
    const modalRef = useCssAnimation(styles.visible, isOpen, [isOpen]);
    
    const modalContentRef = React.useRef();

    const outsideClick = e => {
        if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    const closeModal = () => setIsOpen(false);

    return (
        <div className={styles.modal} ref={modalRef} onClick={outsideClick}>
            <div className={styles.modal__window} ref={modalContentRef}>
                <Panel>
                    <div className={styles.modal__header}>
                        <div className={styles.modal__title}>{title}</div>
                        <Svg url={CloseIcon} width="1.1" height="1.1" onClick={closeModal}/>
                    </div>
                    <div className={styles.modal__content}>
                        {children}
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