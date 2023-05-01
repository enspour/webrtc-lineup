import { useState, useEffect, memo } from 'react'
import { useRouter } from 'next/router';

import AuthAPI from '@api/AuthAPI';

import InputControl from '@components/ui/InputControl/InputControl';
import CheckBox from '@components/ui/CheckBox/CheckBox';
import FilledButton from '@components/ui/FilledButton/FilledButton';

import useError from '@hooks/api/useError';
import useRequest from '@hooks/api/useRequest';
import useResponse from '@hooks/api/useResponse';

import services from '@services';

import styles from "./SignupWithEmail.module.scss";

const SignupWithEmail = () => {
    const router = useRouter();

    const request = useRequest(AuthAPI.signup);
    const { data } = useResponse(request);
    useError(request);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const signup = () => {
        const body = {
            name,
            email,
            password,
            remember_me: rememberMe,
        }

        request.start({ body });
    }

    useEffect(() => {
        if (data) {
            services.user.Info.update();
            router.push("/");
        }
    }, [data]);

    return (
        <div className={styles.sing__up}>
            <div className={styles.sing__up__title}>Signup</div>

            <div className={styles.sing__up__inputs}>
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

            <div className={styles.sing__up__remember__me}>
                <CheckBox label="Remember me" value={rememberMe} setValue={setRememberMe}/>
            </div>

            <div className={styles.sing__up__btn}>
                <FilledButton onClick={signup}> Signup </FilledButton>
            </div>
        </div>
    )
}

export default memo(SignupWithEmail)