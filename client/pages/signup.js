import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import FilledButton from "@components/ui/FilledButton/FilledButton";
import InputControl from "@components/ui/InputControl/InputControl";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import services from "@services";

import styles from "@styles/pages/signup.module.scss";
import WelcomeLayout from "@components/layouts/WelcomeLayout/WelcomeLayout";

const SignupWithEmail = () => {
    const router = useRouter();

    const request = useRequest(services.authAPI.signup);
    const { data } = useResponse(request);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);

    const signup = React.useCallback(() => {
        const body = {
            name,
            email,
            password,
            remember_me: rememberMe,
        }

        request.start({ body });
    }, [name, email, password, rememberMe]);

    React.useEffect(() => {
        if (data) {
            services.user.update();
            router.push("/");
        }
    }, [data]);

    return (
        <div className={styles.singup}>
            <div className={styles.singup__title}>Signup</div>

            <div className={styles.singup__inputs}>
                <InputControl
                    type="text" 
                    placeholder="Enter your name" 
                    value={name}
                    setValue={setName}
                />
                
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

                <InputControl
                    type="password" 
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                />
            </div>

            <div className={styles.singup__remember_me}>
                <CheckBox label="Remember me" value={rememberMe} setValue={setRememberMe}/>
            </div>

            <div className={styles.singup__btn}>
                <FilledButton onClick={signup}> Signup </FilledButton>
            </div>
        </div>
    )
}

const Signup = () => {
    return (
        <WelcomeLayout title="Lineup | Signup">
            <div className={styles.wrapper}>
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
    );
}

export default Signup;