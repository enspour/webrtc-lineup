import { observer } from "mobx-react-lite";

import { IslandPanel } from "@features/Island";

import services from "@services";

import styles from "./IslandScreen.module.scss";

const IslandScreen = observer(() => {
    const current = services.island.Current;

    return (
        <>
            <div className={styles.island}>
                <IslandPanel />
            </div>

            <div>
                { current.component }
            </div>
        </>
    )
})

export default IslandScreen;