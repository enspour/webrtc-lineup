import { memo, useEffect, useRef } from "react"

import Svg from "@components/ui/Svg/Svg";

import CloseIcon from "@assets/images/notification/close.svg";

import services from "@services";

import styles from "./Notification.module.scss";

const Notification = ({ notification }) => {
    const timeout = useRef(null);

    const close = () => {
        services.notification.close(notification.id);
    }

    useEffect(() => {
        clearTimeout(timeout.current)
        timeout.current = setTimeout(close, 5000);
    }, []);

    return (
        <div className={styles.notification}>
            <div className={styles.notification__header}>
                <div className={styles.notification__header__title}>Notification</div>

                <Svg 
                    url={CloseIcon} 
                    height="1.1" 
                    width="1.1" 
                    onClick={close} 
                    color="var(--theme-icon-primary)"
                />
            </div>

            <div className={styles.notification__message}>
                {notification.message}
            </div>
        </div>
    );
}

export default memo(Notification);