import { memo } from "react";

import ProfileCredentials from "./ProfileCredentials";

import styles from "./Profile.module.scss";

const Profile = () => {
    return (
        <div className={styles.profile}>
            <div className="text-primary">Account</div>
            <div className="text-placeholder">
                Here you can edit your public information and password.
            </div>

            <ProfileCredentials />
        </div>
    )
}

export default memo(Profile);