import React from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";

import services from "@services";

import styles from "./Header.module.scss";

const Header = observer(() => { 
    const user = services.user.User;
    
    return (
        <header className={styles.header}>
            <Link href="/">
                <div className={styles.header__logo}>Lineup</div>
            </Link>

            <div className={styles.account}>
                <div className={styles.account__avatar}></div>
                <div> {user.name} </div>
            </div>
        </header>
    )
});

export default Header;