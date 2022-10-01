import React from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

import { IslandSearchTab, IslandViewTabs } from "@features/Island/Island.states";

import AddRoomModal from "../AddRoomModal/AddRoomModal";
import SearchInput from "@components/ui/SearchInput/SearchInput";
import Panel from "@components/ui/Panel/Panel";
import Svg from "@components/ui/Svg/Svg";

import useManualCssAnimation from "@hooks/css/useManualCssAnimation";
import useSaveStateIsland from "@features/Island/hooks/useSaveStateIsland";

import services from "@services";

import SearchIcon from "@assets/images/tabPanel/search.svg";
import AddIcon from "@assets/images/tabPanel/add.svg";
import BackIcon from "@assets/images/tabPanel/back.svg";

import styles from "./IslandPanel.module.scss"; 

const classes = (...classes) => {
    return classes.join(" ");
}

const Search = observer(({ removeStyleGotoSearch, removeStyleSearchActive }) => {
    const searchedText = services.search.SearchedText;
    const setSearchedText = React.useCallback(
        (text) => services.search.SearchedText = text,
        []
    );

    const gotoBack = () => {
        removeStyleSearchActive();
        removeStyleGotoSearch(400);
        services.island.undo();
    };

    return (
        <div className={styles.island__search}>
            <div className={styles.island__search__btn}>
                <Svg url={BackIcon} width="1.2" height="1.9" onClick={gotoBack}/>
            </div>

            <SearchInput placeholder="Search" value={searchedText} setValue={setSearchedText}/>
        </div>
    )
})

const Tabs = observer(() => (
    <div className={styles.tabs}>
        {
            IslandViewTabs.map(item => 
                <div 
                    key={item.id}
                    className={
                        classes(styles.tab, services.island.CurrentId === item.id ? styles.tab__active : "")
                    }
                    onClick={() => services.island.CurrentId = item.id}
                >
                    {item.name}
                </div>
            )
        } 
    </div> 
));

const IslandPanel = observer(() => {   
    useSaveStateIsland();
    
    const islandRef = React.useRef();

    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const [addStyleGotoSearch, removeStyleGotoSearch] 
        = useManualCssAnimation(islandRef, styles.island__goto_search);
    const [addStyleSearchActive, removeStyleSearchActive] 
        = useManualCssAnimation(islandRef, styles.island__search__active);

    const gotoSearch = () => {
        services.island.CurrentId = IslandSearchTab.id;
    };

    React.useEffect(
        () => 
            autorun(() => {
                if (services.island.CurrentId === IslandSearchTab.id) {
                    addStyleGotoSearch();
                    addStyleSearchActive(400); 
                }
            }) 
        , []
    )

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
                        
                        <Tabs/>
                        
                        <Svg 
                            url={AddIcon}
                            width="1.4"
                            height="1.4"
                            onClick={() => setIsOpenModal(true)}
                        />
                    </div>

                    <Search 
                        removeStyleGotoSearch={removeStyleGotoSearch} 
                        removeStyleSearchActive={removeStyleSearchActive}
                    />
                </Panel>
            </div>

            <AddRoomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
        </>
    )
});

export default IslandPanel;