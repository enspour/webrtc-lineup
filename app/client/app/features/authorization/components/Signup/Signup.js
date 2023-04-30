import { memo } from 'react'
import Link from 'next/link'

import WelcomeLayout from '@components/layouts/WelcomeLayout/WelcomeLayout'
import SignupWithEmail from '../SignupWithEmail/SignupWithEmail'

import styles from "./Signup.module.scss"

const Signup = () => {
    return (
        <WelcomeLayout title="Lineup | Signup">
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
        </WelcomeLayout>
    )
}

export default memo(Signup)