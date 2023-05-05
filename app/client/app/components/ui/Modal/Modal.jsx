import React from "react";
import PropTypes from "prop-types";

import PanelPlusHeader from "../PanelPlusHeader/PanelPlusHeader";

import useCssAnimation from "@hooks/css/useCssAnimation";

import styles from "./Modal.module.scss";

const Modal = ({ 
    title, 
    isOpen, 
    close, 

    width = "inherit",

    children,
}) => {
    const modalRef = useCssAnimation(styles.visible, isOpen, [isOpen]);
    
    const modalContentRef = React.useRef();

    const outsideClick = e => {
        if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            close();
        }
    }

    if (!isOpen) return "";

    return (
        <div ref={modalRef} className={styles.modal} onClick={outsideClick}>
            <div 
                ref={modalContentRef}
                className={styles.modal__window} 
                style={{
                    width: `min(${width}, 95vw)`,
                }}
            >
                <PanelPlusHeader 
                    title={title} 
                    onClick={close} 
                    maxHeight="100vh"
                >
                    {children}
                </PanelPlusHeader>
            </div>
        </div>
    );
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default React.memo(Modal);