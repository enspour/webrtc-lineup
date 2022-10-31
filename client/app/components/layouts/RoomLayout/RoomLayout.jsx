import Head from "next/head";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";

import services from "@services";

import styles from "./RoomLayout.module.scss"

const RoomLayout = observer(({ children }) => {
    const name = services.room.Name;

    const router = useRouter();

    const leave = async () => {
        const response = await services.room.leave();
        router.push("/");
    }

    return (
        <div className={styles.room}>
            <Head>
                <title>Lineup | Room</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div>
                <div className="fl jf-between al-center g-2">
                    <div className={styles.room__title}> {name} </div>

                    <div className={styles.room__btn__leave}>
                        <OutlinedButton onClick={leave}>
                            Leave
                        </OutlinedButton>
                    </div>
                </div>
            </div>
            <div>
                { children }
            </div>
        </div>
    )
})

export default RoomLayout;