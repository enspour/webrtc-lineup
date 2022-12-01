import React from "react";

import Panel from "../Panel/Panel"
import Svg from "../Svg/Svg";

import CloseIcon from "@assets/images/modal/close.svg";

import styles from "./PanelPlusHeader.module.scss";

const PanelHeader = ({ title, onClick }) => {
    return (
        <div className={styles.panel__header}>
            <div className={styles.panel__header__wrapper}>
                <div className={styles.panel__header__title}> { title } </div>
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

const PanelPlusHeader = ({ 
    title, 
    onClick,

    minHeight = "", 
    maxHeight = "", 
    height = "inherit",

    minWidth = "",
    maxWidth = "",
    width = "inherit",

    children 
}) => {
    return (
        <Panel
            minHeight={minHeight}
            maxHeight={maxHeight}
            height={height}
            minWidth={minWidth}
            maxWidth={maxWidth}
            width={width}
            overflow="hidden"
        >   
            <PanelHeader title={title} onClick={onClick}/>
            <div 
                className={styles.panel__content}
                style={{
                    ... minHeight ? { minHeight: `calc(${minHeight} - 6rem)` } : {},
                    ... maxHeight ? { maxHeight: `calc(${maxHeight} - 6rem)` } : {},
                    ... minWidth ? { minWidth } : {},
                    ... maxWidth ? { maxWidth } : {},
    
                    height,
                    width,
                }} 
            >
                {children}
            </div>
        </Panel>
    )
}

export default React.memo(PanelPlusHeader);