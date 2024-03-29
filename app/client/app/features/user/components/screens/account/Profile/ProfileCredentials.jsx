import { useEffect, useState, memo } from "react";
import { autorun } from "mobx";

import FilledButton from "@components/ui/FilledButton/FilledButton";
import EditInput from "@components/ui/EditInput/EditInput";

import services from "@services";

import styles from "./Profile.module.scss";

const ProfileCredentials = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const saveEmail = () => {}

    const saveName = () => {}

    const reset = () => {}

    useEffect(() =>
        autorun(() => {
            const userName = services.user.Info.Name;
            const userEmail = services.user.Info.Email; 

            setName(userName);
            setEmail(userEmail);
        }),
    []);

    return (
        <div className={styles.profile__credentials}>
            <div>
                <div className="mb-1 text-primary">Email Address</div>
                <EditInput value={email} setValue={setEmail} placeholder="Email" onClick={saveEmail}/>
            </div>

            <div className="fl jf-between">
                <div className="w-60">
                    <div className="mb-1 text-primary">Name</div>
                    <EditInput value={name} setValue={setName} placeholder="Name" onClick={saveName}/>
                </div>

                <div className="w-35">
                    <div className="mb-1 text-primary">Password</div>
                    <FilledButton onClick={reset}> Reset </FilledButton>
                </div>
            </div>
        </div>
    )
};

export default memo(ProfileCredentials)