import React from "react"; 

import MainLayout from "@components/layouts/MainLayout/MainLayout";
import TabPanel from "@components/ui/TabPanel/TabPanel";

import styles from "@styles/pages/index.module.scss";

const tabs = [
    { id: 1, name: "Store" },
    { id: 2, name: "Favorites" }
]

const Home = () => { 
    const [tab, setTab] = React.useState(tabs[0]);

    return (
        <MainLayout> 
            <div className={styles.tabPanel}>
                <TabPanel tab={tab} setTab={setTab} tabs={tabs}/>
            </div>
        </MainLayout>
    );
}

export default Home;