import React from "react";
import { autorun } from "mobx";

import FilledButton from "@components/ui/FilledButton/FilledButton";
import EditInput from "@components/ui/EditInput/EditInput";

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
                <div className="mb-1 text-primary">Email Address</div>
                <EditInput value={email} setValue={setEmail} placeholder="Email"/>
            </div>

            <div className="fl jf-between">
                <div className="w-60">
                    <div className="mb-1 text-primary">Name</div>
                    <EditInput value={name} setValue={setName} placeholder="Name"/>
                </div>

                <div className="w-35">
                    <div className="mb-1 text-primary">Password</div>
                    <FilledButton onClick={changePassword}> Reset </FilledButton>
                </div>
            </div>
        </div>
    )
});

const ProfileScreen = () => {
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
        <div className={styles.profile}>
            <div className="text-primary">Account</div>
            <div className="text-placeholder">
                Here you can edit your public information and password.
            </div>

            <ProfileCredentials
                email={email} setEmail={setEmail} 
                name={name} setName={setName}
            />
        </div>
    )
}


export default React.memo(ProfileScreen);