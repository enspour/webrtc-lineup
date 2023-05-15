import Link from "next/link";
import { memo } from "react";

import LoginWithEmail from "../../ui/LoginWithEmail/LoginWithEmail";

import styles from "./Login.module.scss"

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}> Lineup </div>

            <LoginWithEmail />

            <div className={styles.sign__up}>
                <span>Нет аккаунта? </span>
                <Link href="/signup">
                    <span className={styles.sign__up__link}>Зарегистрироваться</span>
                </Link>
            </div>
        </div>
    );
}

export default memo(Login);