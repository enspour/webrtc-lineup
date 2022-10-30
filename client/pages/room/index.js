import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";

import { CardsScreen } from "@features/room";

import services from "@services";

import styles from "@styles/pages/room.module.scss";

const Room = observer(() => {
    const name = services.room.Name;

    const router = useRouter();

    const leave = async () => {
        const response = await services.room.leave();
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