import { useState, useEffect, memo } from "react"
import { useRouter } from "next/router";

import AuthAPI from "@api/AuthAPI";

import InputControl from "@components/ui/InputControl/InputControl";
import CheckBox from "@components/ui/CheckBox/CheckBox";
import FilledButton from "@components/ui/FilledButton/FilledButton";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";
import useError from "@hooks/api/useError";

import styles from "./LoginWithEmail.module.scss";

const LoginWithEmail = () => {
    const router = useRouter();

    const request = useRequest(AuthAPI.login);
    const { data } = useResponse(request);
    useError(request)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const login = () => {
        const body = {
            email,
            password,
            remember_me: rememberMe,
        }

        request.start({ body });
    }

    useEffect(() => {
        if (data) {
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
            
            <div className={styles.login__remember__me}>
                <CheckBox label="Remember me" value={rememberMe} setValue={setRememberMe}/>
            </div>

            <div className={styles.login__btn}>
                <FilledButton onClick={login}> Login </FilledButton>
            </div>
        </div>
    )
}

export default memo(LoginWithEmail)