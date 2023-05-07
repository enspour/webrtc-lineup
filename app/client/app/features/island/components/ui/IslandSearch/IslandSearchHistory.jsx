import { useRef } from "react";
import { observer } from "mobx-react-lite";

import Svg from "@components/ui/Svg/Svg";

import useIsHover from "@hooks/useIsHover";

import services from "@services";

import ClearIcon from "@assets/images/search/clear.svg";
import HistoryIcon from "@assets/images/search/history.svg";

import styles from "./IslandSearch.module.scss";

const IslandSearchHistoryItem = ({ item, setIsOpen }) => {
    const historyItemRef = useRef();

    const isHover = useIsHover(historyItemRef);
    
    const handleClickOnItem = () => {
        services.island.Search.History.push(item);
        services.island.Search.Text = item;
        services.island.Search.update();
        setIsOpen(false);
    }
    
    const handleClickOnRemove = (e) => {
        e.stopPropagation();
        services.island.Search.History.remove(item);
    }

    return (
        <div 
            ref={historyItemRef}
            className={styles.history__item} 
            onClick={handleClickOnItem}
        >
            <div className={styles.history__item__body}>
                <Svg
                    url={HistoryIcon} 
                    height="1.8" 
                    width="2.1"
                    color={isHover ? "var(--theme-color-secondary)" : "var(--theme-icon-primary)"}
                />

                <span className={styles.history__item__text}>{item}</span>
            </div>

            <Svg
                url={ClearIcon}
                height="1.4" 
                width="1.4" 
                onClick={handleClickOnRemove}
                color={isHover ? "var(--theme-color-secondary)" : "var(--theme-icon-primary)"}
            />
        </div>
    )
}

const IslandSearchHistory = observer(({ isOpen, setIsOpen}) => {
    const text = services.island.Search.Text;
    const history = services.island.Search.History.Array;

    const items = history.filter(item => item.startsWith(text) && item !== text).slice(0, 20);

    if (!isOpen || items.length === 0) return ""; 
    
    return (
        <div className={styles.history}>
            <div className={styles.history__items}>
                {
                    items.map(item => 
                        <IslandSearchHistoryItem 
                            key={item}
                            item={item}
                            setIsOpen={setIsOpen} 
                        />
                    )
                }
            </div>
        </div>
    )
});

export default IslandSearchHistory;