import React from "react";
import Link from "next/link";

import { useRouter } from "next/router";

import Panel from "@components/ui/Panel/Panel";
import CheckBox from "@components/ui/CheckBox/CheckBox";
import FilledButton from "@components/ui/FilledButton/FilledButton";
import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";
import InputControl from "@components/ui/InputControl/InputControl";

import useRequest from "@hooks/useRequest";
import useResponse from "@hooks/useResponse";

import services from "@services";

import styles from "@styles/pages/login.module.scss";

const LoginAsGuest = React.memo(() => {
    const LoginAsGuest = () => {
        console.log("Login as guest");
    }

    return <OutlinedButton value="Sign in as Guest" onClick={LoginAsGuest}/>
});

const LoginWithGoogle = React.memo(() => {
    const LoginWithGoogle = () => {
        console.log("Login with google");
    };
    
    return <OutlinedButton value="Sign in with Google" onClick={LoginWithGoogle}/>
});

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
        if (data) router.push("/");
    }, [data]);

    return (
        <div className={styles.login_with_email}>
            <div className={styles.login_with_email__title}>Sign in with Email</div>
            
            <div className={styles.login_with_email__inputs}>
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
            
            <div className={styles.login_with_email__recovery}>Recovery Password</div>
            
            <div className={styles.login_with_email__remember_me}>
                <CheckBox label="Remember me" setValue={setRememberMe}/>
            </div>

            <div className={styles.login_with_email__btn}>
                <FilledButton value="Login" onClick={login}/>
            </div>
        </div>
    )
})

const Login = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Panel>
                    <div className={styles.wrapper}>
                        <div className={styles.logo}>Lineup</div>

                        <div className={styles.title}>Login</div>
                        
                        <div className={styles.login_another_way}>
                            <LoginAsGuest />
                            <LoginWithGoogle />
                        </div>

                        <LoginWithEmail />

                        <div className={styles.signup}>
                            <span>Don't have account? </span>
                            <Link href="/signup">
                                <span className={styles.signup__link}>Signup</span>
                            </Link>
                        </div>
                    </div>
                </Panel>
            </div>
        </main>
    );
}

export default Login;