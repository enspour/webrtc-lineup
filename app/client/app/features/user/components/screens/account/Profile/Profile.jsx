import { memo } from "react";

import ProfileCredentials from "./ProfileCredentials";

import styles from "./Profile.module.scss";

const Profile = () => {
    return (
        <div className={styles.profile}>
            <div className="text-primary">Аккаунт</div>
            <div className="text-placeholder">
                Здесь вы можете изменять информацию о себе и пароль.
            </div>

            <ProfileCredentials />
        </div>
    )
}

export default memo(Profile);