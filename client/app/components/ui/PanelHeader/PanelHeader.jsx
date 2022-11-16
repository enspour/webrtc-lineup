import React from "react";

import Svg from "../Svg/Svg";

import CloseIcon from "@assets/images/modal/close.svg";

import styles from "./PanelHeader.module.scss";

const PanelHeader = ({ title, onClick }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.header__title}> { title } </div>
                <Svg 
                    url={CloseIcon} 
                    width="1.1" 
                    height="1.1" 
                    onClick={onClick} 
                    color="var(--theme-icon-quaternary)"
                />
            </div>
        </div>
    )
}

export default React.memo(PanelHeader);