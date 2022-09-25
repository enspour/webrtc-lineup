import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Panel from "@components/ui/Panel/Panel";
import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";
import FilledButton from "@components/ui/FilledButton/FilledButton";
import InputControl from "@components/ui/InputControl/InputControl";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import useRequest from "@hooks/useRequest";
import useResponse from "@hooks/useResponse";

import services from "@services";

import styles from "@styles/pages/signup.module.scss";

const SignupWithGoogle = () => {
    const SignupWithGoogle = () => {
        console.log("Signup with google");
    };
    
    return <OutlinedButton value="Sign up with Google" onClick={SignupWithGoogle}/>
}

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
        if (data) router.push("/");
    }, [data]);

    return (
        <div className={styles.singup_with_email}>
            <div className={styles.singup_with_email__title}>Sign up with Email</div>

            <div className={styles.singup_with_email__inputs}>
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

            <div className={styles.singup_with_email__remember_me}>
                <CheckBox label="Remember me" setValue={setRememberMe}/>
            </div>

            <div className={styles.signup_with_email__btn}>
                <FilledButton value="Signup" onClick={signup}/>
            </div>
        </div>
    )
}

const Signup = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Panel>
                    <div className={styles.wrapper}>
                        <div className={styles.logo}>Lineup</div>

                        <div className={styles.title}>Signup</div>
                        
                        <SignupWithGoogle />

                        <SignupWithEmail />

                        <div className={styles.login}>
                            <span>Do have account? </span>
                            <Link href="/login">
                                <span className={styles.login__link}>Login</span>
                            </Link>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    );
}

export default Signup;