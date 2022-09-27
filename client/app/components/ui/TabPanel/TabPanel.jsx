import React from "react";
import { observer } from "mobx-react-lite";

import SearchInput from "../SearchInput/SearchInput";
import Panel from "../Panel/Panel";
import Svg from "../Svg/Svg";

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

const TabPanel = observer(({ tab, setTab }) => {
    const tabsRef = React.useRef();
    
    const searchedText = services.search.SearchedText;
    const setSearchedText = React.useCallback(
        (text) => services.search.SearchedText = text,
        []
    );

    const gotoSearch = React.useCallback(() => {
        tabsRef.current.classList.add(styles.tabs__goto_search);
        setTimeout(() => {
            tabsRef.current.classList.add(styles.tabs__search__active)
        }, 400);
    }, []);

    const gotoBack = React.useCallback(() => {
        tabsRef.current.classList.remove(styles.tabs__search__active);
        setTimeout(() => {
            tabsRef.current.classList.remove(styles.tabs__goto_search)
        }, 400);
    }, []);

    return (
        <div className={styles.tabs} ref={tabsRef}>
            <Panel>
                <div className={styles.wrapper}>
                    <Svg url={SearchIcon} width="1.8" height="1.8" onClick={gotoSearch}/>
                    
                    <div className={styles.tabs__items}>
                        <Tab name="Store" active={tab.name === "Store"} setTab={setTab}/>
                        <Tab name="Favorites" active={tab.name === "Favorites"} setTab={setTab}/> 
                    </div>
                    
                    <Svg url={AddIcon} width="1.4" height="1.4"/>
                </div>

                <div className={styles.tabs__search}>
                    <div className={styles.tabs__search__btn}>
                        <Svg url={BackIcon} width="1.2" height="1.9" onClick={gotoBack}/>
                    </div>

                    <SearchInput placeholder="Search" value={searchedText} setValue={setSearchedText}/>
                </div>
            </Panel>
        </div>
    )
});

export default TabPanel;