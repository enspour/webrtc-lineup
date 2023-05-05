import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

import { IslandSearchTab } from "@features/island/stores/Island.states";

import Panel from "@components/ui/Panel/Panel";
import Svg from "@components/ui/Svg/Svg";
import IslandSearch from "../../ui/IslandSearch/IslandSearch";
import IslandTabs from "../../ui/IslandTabs/IslandTabs";

import useManualCssAnimation from "@hooks/css/useManualCssAnimation";

import services from "@services";

import SearchIcon from "@assets/images/island/search.svg";
import AddIcon from "@assets/images/island/add.svg";
import BackIcon from "@assets/images/island/back.svg";

import styles from "./Island.module.scss"; 

const Island = observer(() => {   
    const islandRef = useRef();

    const [addStyleOpeningSearch, removeStyleOpeningSearch]
        = useManualCssAnimation(islandRef, styles.island__opening__search);
    const [addStyleOpenSearch, removeStyleOpenSearch] 
        = useManualCssAnimation(islandRef, styles.island__open__search);

    const openSearch = () => {
        services.island.Tabs.openSearch();
    }

    const back = () => {
        removeStyleOpenSearch();
        removeStyleOpeningSearch(400);
        setTimeout(() => {
            services.island.Tabs.back();
        }, 400)
    };

    const openCreateRoomModal = () => {
        services.modals.createRoom.open();
    }

    useEffect(() => 
        autorun(() => {
            if (services.island.Tabs.CurrentId === IslandSearchTab.id) {
                addStyleOpeningSearch();
                addStyleOpenSearch(400); 
            }
        }) 
    , [])

    return (
        <div ref={islandRef} className={styles.island}>
            <Panel>
                <div className={styles.container}>
                    <Svg 
                        url={SearchIcon}
                        width="1.8" 
                        height="1.8" 
                        onClick={openSearch}
                    />
                    
                    <IslandTabs/>
                    
                    <Svg 
                        url={AddIcon}
                        width="1.4"
                        height="1.4"
                        onClick={openCreateRoomModal}
                    />
                </div>

                <div className={styles.island__search}>
                    <div>
                        <Svg url={BackIcon} width="1.2" height="1.9" onClick={back}/>
                    </div>

                    <IslandSearch placeholder="Search"/>
                </div>
            </Panel>
        </div>  
    )
});

export default Island;