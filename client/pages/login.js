import React from "react";
import Link from "next/link";

import { useRouter } from "next/router";

import WelcomeLayout from "@components/layouts/WelcomeLayout/WelcomeLayout";

import CheckBox from "@components/ui/CheckBox/CheckBox";
import FilledButton from "@components/ui/FilledButton/FilledButton";
import InputControl from "@components/ui/InputControl/InputControl";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import services from "@services";

import styles from "@styles/pages/login.module.scss";

const LoginWithEmail = React.memo(() => {
    const router = useRouter();

    const request = useRequest(services.authAPI.login);
    const { data } = useResponse(request);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);

    const login = React.useCallback(() => {
        const body = {
            email,
            password,
            remember_me: rememberMe,
        }

        request.start({ body });
    }, [email, password, rememberMe]);

    React.useEffect(() => {
        if (data) {
            services.user.update();
            router.push("/");
        }
    }, [data]);

    return (
        <div className={styles.login}>
            <div className={styles.login__title}>Login</div>
            
            <div className={styles.login__inputs}>
                <InputControl 
                    type="text" 
                    placeholder="Enter your email" 
                    value={email}
                    setValue={setEmail}
                />
                
                <InputControl 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    setValue={setPassword}
                />
            </div>
            
            <div className={styles.login__recovery}>Recovery Password</div>
            
            <div className={styles.login__remember_me}>
                <CheckBox label="Remember me" value={rememberMe} setValue={setRememberMe}/>
            </div>

            <div className={styles.login__btn}>
                <FilledButton onClick={login}> Login </FilledButton>
            </div>
        </div>
    )
})

const Login = () => {
    return (
        <WelcomeLayout title="Lineup | Login">
            <div className={styles.wrapper}>
                <div className={styles.title}> Lineup </div>

                <LoginWithEmail />

                <div className={styles.signup}>
                    <span>Don't have account? </span>
                    <Link href="/signup">
                        <span className={styles.signup__link}>Signup</span>
                    </Link>
                </div>
            </div>
        </WelcomeLayout>
    );
}

export default Login;