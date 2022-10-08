import { observer } from "mobx-react-lite";

import MainLayout from "@components/layouts/MainLayout/MainLayout";

import IslandPanel from "@components/pages/index/IslandPanel/IslandPanel";
import { IslandTabs } from "@features/Island/Island.states";

import services from "@services";

import styles from "@styles/pages/index.module.scss";

const Home = observer(() => {
    const IslandTabId = services.island.CurrentId;
    const IslandTabName = IslandTabs.find(item => item.id === services.island.CurrentId).name;

    return (
        <MainLayout title={`Lineup | ${IslandTabName}`}> 
            <div className={styles.island}>
                <IslandPanel />
            </div>

            <div>
                { IslandTabs.find(item => item.id === IslandTabId).component }
            </div>
        </MainLayout>
    );
})

export default Home;