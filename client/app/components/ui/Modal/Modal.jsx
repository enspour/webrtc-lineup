import React from "react";
import PropTypes from "prop-types";

import Panel from "../Panel/Panel";
import PanelHeader from "../PanelHeader/PanelHeader";

import useCssAnimation from "@hooks/css/useCssAnimation";

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
                <Panel maxHeight="100vh">
                    <PanelHeader title={title} onClick={closeModal}/>
                    
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