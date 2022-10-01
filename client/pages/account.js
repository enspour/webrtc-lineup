import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import MainLayout from "@components/layouts/MainLayout/MainLayout";
import FilledButton from "@components/ui/FilledButton/FilledButton";
import SimpleInput from "@components/ui/SimpleInput/SimpleInput";
import Themes from "@components/pages/account/Themes/Themes";
import Panel from "@components/ui/Panel/Panel";

import useLogout from "@hooks/api/useLogout";

import services from "@services";

import styles from "@styles/pages/account.module.scss";

const AccountCredentials = React.memo(({ 
    email, 
    setEmail,
    name,
    setName
}) => {
    const changePassword = React.useCallback(() => {
        console.log("Change password")
    }, [])

    return (
        <div className={styles.account__credentials}>
            <div>
                <div className="mb-1 c-p">Email address</div>
                <SimpleInput value={email} setValue={setEmail} placeholder="Email"/>
            </div>

            <div className="fl g-3">
                <div className="w-140">
                    <div className="mb-1 c-p">Name</div>
                    <SimpleInput value={name} setValue={setName} placeholder="Name"/>
                </div>

                <div className="w-100">
                    <div className="mb-1 c-p">Password</div>
                    <FilledButton onClick={changePassword}> Change </FilledButton>
                </div>
            </div>
        </div>
    )
});

const AccountProfile = observer(() => {
    const username = services.user.Name;
    const useremail = services.user.Email; 

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");

    React.useEffect(
        () =>
            autorun(() => {
                setName(username);
                setEmail(useremail);
            }),
        [username, useremail]
    );

    return (
        <div className="w-100">
            <div className="c-p">Account</div>
            <div className={styles.account__title__helper}>
                Here you can edit your public information and password.
            </div>

            <AccountCredentials 
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

const ThemesTitle = () => {
    return (
        <div className="w-100">
            <div className="c-p">Theme</div>
            <div className={styles.themes__title__helper}>
                Choose a theme that interests you.
            </div>
        </div>
    )
}

const Account = () => {
    return (
        <MainLayout>
            <div className={styles.container}>
                <Panel>
                    <div className={styles.wrapper}>
                        <div className={styles.account}>
                            <AccountProfile />
                            <div>
                                <AccountLogout />
                                <div className={styles.account__avatar}></div>
                            </div>
                        </div>

                        <div className={styles.themes}>
                            <ThemesTitle />
                            <Themes />
                        </div>
                    </div>
                </Panel>
            </div>
        </MainLayout>
    )
};

export default React.memo(Account);