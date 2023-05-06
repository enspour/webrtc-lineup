import { memo } from "react";
import Link from "next/link";

import SignupWithEmail from "../../ui/SignupWithEmail/SignupWithEmail";

import styles from "./Signup.module.scss";

const Signup = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Lineup</div>

            <SignupWithEmail />

            <div className={styles.login}>
                <span>Do have account? </span>
                <Link href="/login">
                    <span className={styles.login__link}>Login</span>
                </Link>
            </div>
        </div>
    );
}

export default memo(Signup);