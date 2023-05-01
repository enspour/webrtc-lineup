import { observer } from "mobx-react-lite";

import LobbyLayout from "@components/layouts/LobbyLayout/LobbyLayout";

import { IslandPanel } from "@features/island";

import services from "@services";

import styles from "@styles/pages/index.module.scss"

const Home = observer(() => {
    const current = services.island.Current;

    return (
        <LobbyLayout title={`Lineup | ${current.name}`}> 
            <div className={styles.island}>
                <IslandPanel />
            </div>

            <div>
                { current.component }
            </div>
        </LobbyLayout>
    );
})

export default Home;