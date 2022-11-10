import Head from "next/head";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import RedirectDisconnectedUser from "@components/wrappers/RedirectDisconnectedUser";

import FilledButton from "@components/ui/FilledButton/FilledButton";

import services from "@services";

import styles from "./RoomLayout.module.scss"

const RoomLayout = observer(({ title = "Lineup | Room", children }) => {
    const name = services.room.Name;
    
    const router = useRouter();

    const leave = async () => {
        const response = await services.room.leave();
        router.push("/");
    }

    return (
        <RedirectDisconnectedUser>
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>

                <div className={styles.room__header}>
                    <div className={styles.room__header__title}> {name} </div>

                    <div className={styles.room__header__leave}>
                        <FilledButton onClick={leave} height="3.5rem">
                            Leave
                        </FilledButton>
                    </div>
                </div>
                
                <div className={styles.room__content}>
                    { children }
                </div>
            </div>
        </RedirectDisconnectedUser>
    )
})

export default RoomLayout;