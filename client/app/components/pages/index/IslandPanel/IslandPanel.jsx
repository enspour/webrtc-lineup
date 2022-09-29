import React from "react";
import { observer } from "mobx-react-lite";

import AddRoomModal from "../AddRoomModal/AddRoomModal";
import SearchInput from "@components/ui/SearchInput/SearchInput";
import Panel from "@components/ui/Panel/Panel";
import Svg from "@components/ui/Svg/Svg";

import useManualCssAnimation from "@hooks/css/useManualCssAnimation";

import services from "@services";

import SearchIcon from "@assets/images/tabPanel/search.svg";
import AddIcon from "@assets/images/tabPanel/add.svg";
import BackIcon from "@assets/images/tabPanel/back.svg";

import styles from "./IslandPanel.module.scss"; 

const classes = (...classes) => {
    return classes.join(" ");
}

const Search = observer(({ manager, removeStyleGotoSearch, removeStyleSearchActive }) => {
    const searchedText = services.search.SearchedText;
    const setSearchedText = React.useCallback(
        (text) => services.search.SearchedText = text,
        []
    );

    const gotoBack = React.useCallback(() => {
        removeStyleSearchActive();
        removeStyleGotoSearch(400);
        manager.undo();
    }, []);

    return (
        <div className={styles.island__search}>
            <div className={styles.island__search__btn}>
                <Svg url={BackIcon} width="1.2" height="1.9" onClick={gotoBack}/>
            </div>

            <SearchInput placeholder="Search" value={searchedText} setValue={setSearchedText}/>
        </div>
    )
})

const Tabs = React.memo(({ manager }) => {
    const { tabs, activeTabId, setActiveTabId } = manager;

    return (
        <div className={styles.tabs}>
            {
                tabs.map(item => 
                    <div 
                        key={item.id}
                        className={
                            classes(styles.tab, activeTabId === item.id ? styles.tab__active : "")
                        }
                        onClick={() => setActiveTabId(item.id)}
                    >
                        {item.name}
                    </div>
                )
            } 
        </div> 
    )
});

const IslandPanel = ({ manager }) => {
    const islandRef = React.useRef();

    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const [addStyleGotoSearch, removeStyleGotoSearch] 
        = useManualCssAnimation(islandRef, styles.island__goto_search);
    const [addStyleSearchActive, removeStyleSearchActive] 
        = useManualCssAnimation(islandRef, styles.island__search__active);

    const gotoSearch = React.useCallback(() => {
        addStyleGotoSearch();
        addStyleSearchActive(400); 
        setTimeout(manager.setActiveTabId, 400, manager.searchTab.id);
    }, []); 

    return (
        <>
            <div className={styles.island} ref={islandRef}>
                <Panel>
                    <div className={styles.wrapper}>
                        <Svg 
                            url={SearchIcon}
                            width="1.8" 
                            height="1.8" 
                            onClick={gotoSearch}
                        />
                        
                        <Tabs manager={manager}/>
                        
                        <Svg 
                            url={AddIcon}
                            width="1.4"
                            height="1.4"
                            onClick={() => setIsOpenModal(true)}
                        />
                    </div>

                    <Search 
                        manager={manager}
                        removeStyleGotoSearch={removeStyleGotoSearch} 
                        removeStyleSearchActive={removeStyleSearchActive}
                    />
                </Panel>
            </div>

            <AddRoomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
        </>
    )
};

export default IslandPanel;