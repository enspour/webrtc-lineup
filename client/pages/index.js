import { observer } from "mobx-react-lite";

import MainLayout from "@components/layouts/MainLayout/MainLayout";

import IslandPanel from "@components/pages/index/IslandPanel/IslandPanel";

import services from "@services";

import styles from "@styles/pages/index.module.scss";

const Home = observer(() => {
    const current = services.island.Current;

    return (
        <MainLayout title={`Lineup | ${current.name}`}> 
            <div className={styles.island}>
                <IslandPanel />
            </div>

            <div>
                { current.component }
            </div>
        </MainLayout>
    );
})

export default Home;