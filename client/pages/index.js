import React from "react"; 

import MainLayout from "@components/layouts/MainLayout/MainLayout";
import TabPanel from "@components/ui/TabPanel/TabPanel";

import styles from "@styles/pages/index.module.scss";

const Home = () => { 
    const [tab, setTab] = React.useState({ name: "Library" });

    return (
        <MainLayout> 
            <div className={styles.tabPanel}>
                <TabPanel tab={tab} setTab={setTab}/>
            </div>
        </MainLayout>
    );
}

export default Home;