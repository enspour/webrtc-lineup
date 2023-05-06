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
                <span>Don't have account? </span>
                <Link href="/signup">
                    <span className={styles.sign__up__link}>Signup</span>
                </Link>
            </div>
        </div>
    );
}

export default memo(Login);