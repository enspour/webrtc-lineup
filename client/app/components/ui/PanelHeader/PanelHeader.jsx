import React from "react";
import { useRouter } from "next/router";

import Svg from "../Svg/Svg";

import BackIcon from "@assets/images/general/back.svg";

import styles from "./PanelHeader.module.scss";

const PanelHeader = ({ title }) => {
    const router = useRouter();

    const back = () => router.back();

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Svg url={BackIcon} width="1.2" height="1.9" onClick={back}/>
                <div className={styles.header__title}> { title } </div>
            </div>
        </div>
    )
}

export default React.memo(PanelHeader);