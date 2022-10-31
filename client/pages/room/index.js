import RoomLayout from "@components/layouts/RoomLayout/RoomLayout";

import { RoomCardsScreen } from "@features/room";

import styles from "@styles/pages/room.module.scss";

const Room = () => {
    return (
        <RoomLayout>
            <div className={styles.room__cards}>
                <RoomCardsScreen />
            </div>
        </RoomLayout>
    )
}

export default Room;