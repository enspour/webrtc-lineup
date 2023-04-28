import { observer } from 'mobx-react-lite';

import Notification from '../Notification/Notification';

import services from '@services';

import styles from "./NotificationsList.module.scss";

const NotificationsList = observer(() => {
    const notifications = services.notification.Notifications;

    return (
        <div className={styles.scroll__container}>
            <div className={styles.container}>
                <div className={styles.notifications}>
                    {notifications.map(item => <Notification key={item.id} notification={item}/>)}
                </div>
            </div>
        </div>
    )
})

export default NotificationsList