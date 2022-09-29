import React from "react"; 

import MainLayout from "@components/layouts/MainLayout/MainLayout";
import IslandPanel from "@components/pages/index/IslandPanel/IslandPanel";

import useIslandManager from "@hooks/useIslandManager";

import styles from "@styles/pages/index.module.scss";

const Home = () => {
    const manager = useIslandManager();

    return (
        <MainLayout> 
            <div className={styles.island}>
                <IslandPanel manager={manager}/>
            </div>

            <div>
                { manager.component }
            </div>
        </MainLayout>
    );
}

export default Home;