import React from "react";
import { observer } from "mobx-react-lite";

import CreatingRoomModal from "../CreatingRoomModal/CreatingRoomModal";
import SearchInput from "../SearchInput/SearchInput";
import Panel from "../Panel/Panel";
import Svg from "../Svg/Svg";

import useManualCssAnimation from "@hooks/css/useManualCssAnimation";

import services from "@services";

import SearchIcon from "@assets/images/tab_panel/search.svg";
import AddIcon from "@assets/images/tab_panel/add.svg";
import BackIcon from "@assets/images/tab_panel/back.svg";

import styles from "./TabPanel.module.scss";

const Tab = React.memo(({ name, active, setTab }) => {
    return (
        <div 
            className={`${styles.tabs__item} ${active ? styles.tabs__item__active : ""}`}
            onClick={() => setTab({ name })}
        >
            {name}
        </div>
    )
})

const TabPanel = observer(({ tab, setTab, tabs }) => {
    const tabsRef = React.useRef();

    const [visibleModal, setVisibleModal] = React.useState(false);

    const [addStyleGotoSearch, removeStyleGotoSearch] 
        = useManualCssAnimation(tabsRef, styles.tabs__goto_search);
    const [addStyleSearchActive, removeStyleSearchActive] 
        = useManualCssAnimation(tabsRef, styles.tabs__search__active);

    const searchedText = services.search.SearchedText;
    const setSearchedText = React.useCallback(
        (text) => services.search.SearchedText = text,
        []
    );

    const gotoSearch = React.useCallback(() => {
        addStyleGotoSearch();
        addStyleSearchActive(400); 
    }, []);

    const gotoBack = React.useCallback(() => {
        removeStyleSearchActive();
        removeStyleGotoSearch(400); 
    }, []);

    return (
        <>
            <div className={styles.tabs} ref={tabsRef}>
                <Panel>
                    <div className={styles.wrapper}>
                        <Svg url={SearchIcon} width="1.8" height="1.8" onClick={gotoSearch}/>
                        
                        <div className={styles.tabs__items}>
                            {
                                tabs.map(item => 
                                    <Tab 
                                        key={item.id} 
                                        name={item.name} 
                                        active={item.name === tab.name} 
                                        setTab={setTab} 
                                    />
                                )
                            } 
                        </div>
                        
                        <Svg 
                            url={AddIcon} 
                            width="1.4" 
                            height="1.4" 
                            onClick={() => setVisibleModal(true)}
                        />
                    </div>

                    <div className={styles.tabs__search}>
                        <div className={styles.tabs__search__btn}>
                            <Svg url={BackIcon} width="1.2" height="1.9" onClick={gotoBack}/>
                        </div>

                        <SearchInput placeholder="Search" value={searchedText} setValue={setSearchedText}/>
                    </div>
                </Panel>
            </div>

            <CreatingRoomModal visible={visibleModal} setVisible={setVisibleModal}/>
        </>
    )
});

export default TabPanel;