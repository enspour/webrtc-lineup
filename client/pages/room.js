import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";
import CardsScreen from "@components/screens/room/CardsScreen/CardsScreen";

import services from "@services";

import styles from "@styles/pages/room.module.scss";

const Room = observer(() => {
    const name = services.roomConnection.Name;

    const router = useRouter();

    const leave = async () => {
        const response = await services.roomConnection.leave();
        router.push("/");
    }

    return (
        <div className={styles.room}>
            <div className="fl jf-between al-center g-2">
                <div className={styles.room__title}> {name} </div>

                <div className={styles.room__btn__leave}>
                    <OutlinedButton onClick={leave}>
                        Leave
                    </OutlinedButton>
                </div>
            </div>

            <div className={styles.room__cards}>
                <CardsScreen />
            </div>
        </div>
    )
})

export default Room;