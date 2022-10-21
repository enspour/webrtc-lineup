import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import FilledButton from "@components/ui/FilledButton/FilledButton";
import SimpleInput from "@components/ui/SimpleInput/SimpleInput";

import useLogout from "@hooks/api/useLogout";

import services from "@services";

import styles from "./ProfileScreen.module.scss";

const ProfileCredentials = React.memo(({ 
    email, 
    setEmail,
    name,
    setName
}) => {
    const changePassword = () => {}

    return (
        <div className={styles.profile__credentials}>
            <div>
                <div className="mb-1 text-primary">Email address</div>
                <SimpleInput value={email} setValue={setEmail} placeholder="Email"/>
            </div>

            <div className="fl g-3">
                <div className="w-140">
                    <div className="mb-1 text-primary">Name</div>
                    <SimpleInput value={name} setValue={setName} placeholder="Name"/>
                </div>

                <div className="w-100">
                    <div className="mb-1 text-primary">Password</div>
                    <FilledButton onClick={changePassword}> Change </FilledButton>
                </div>
            </div>
        </div>
    )
});

const ProfileInformation = observer(() => {
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");

    React.useEffect(
        () =>
            autorun(() => {
                const username = services.user.Name;
                const useremail = services.user.Email; 

                setName(username);
                setEmail(useremail);
            }),
        []
    );

    return (
        <div className="w-100">
            <div className="text-primary">Account</div>
            <div className={styles.profile__title}>
                Here you can edit your public information and password.
            </div>

            <ProfileCredentials
                email={email} setEmail={setEmail} 
                name={name} setName={setName}
            />
        </div>
    )
});

const AccountLogout = () => { 
    const logout = useLogout(); 
    return <FilledButton onClick={logout}> Logout </FilledButton>
}

const ProfileScreen = () => {
    return (
        <div className={styles.profile}>
            <ProfileInformation />

            <div>
                <AccountLogout />
                <div className={styles.profile__avatar}></div>
            </div>
        </div>
    )
}


export default React.memo(ProfileScreen);