import Head from "next/head";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import FilledButton from "@components/ui/FilledButton/FilledButton";

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

            <div className={styles.room__header}>
                <div className="fl jf-between al-center g-2">
                    <div className={styles.room__header__title}> {name} </div>

                    <div className={styles.room__header__leave}>
                        <FilledButton onClick={leave}>
                            Leave
                        </FilledButton>
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