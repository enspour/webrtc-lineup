import React from "react";
import PropTypes from "prop-types";

import useOutsideAlerter from "@hooks/useOutsideAlerter";

import Svg from "../Svg/Svg";

import ClearSVG from "@assets/images/search/clear.svg";

import styles from "./SearchControl.module.scss";

const SearchHelper = ({ isOpen, text, history, onClickHistoryItem, removeHistoryItem }) => {
    const items = history.filter(item => item.startsWith(text));

    if (!isOpen || items.length === 0) {
        return ""
    }
    
    return (
        <div className={styles.search__helper}>
            {
                history.filter(item => item.startsWith(text)).map(item => 
                    <div 
                        key={item}
                        className={styles.search__helper__item} 
                        onClick={() => onClickHistoryItem(item)}
                    > 
                        {item} 
                    </div>
                ) 
            }        
        </div>
    )
}

const SearchInput = ({ placeholder, value, setValue }) => {
    return (
        <div className={styles.search__input}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />

            <Svg url={ClearSVG} height="1.4" width="1.4" onClick={() => setValue("")}/>
        </div>
    )
}

const SearchControl = ({ placeholder, value, setValue, history, onClickHistoryItem, removeHistoryItem }) => {
    const [ref, isOpen, setIsOpen] = useOutsideAlerter(false);

    const onClickHistoryItemWrapper = (text) => {
        setTimeout(() => {
            onClickHistoryItem(text);
            setIsOpen(false);
        }, 0)
    }

    return (
        <div className={styles.search} ref={ref} onClick={() => setIsOpen(true)}>
            <SearchInput placeholder={placeholder} value={value} setValue={setValue}/>
            <SearchHelper 
                isOpen={isOpen}
                text={value} 
                history={history} 
                onClickHistoryItem={onClickHistoryItemWrapper}
                removeHistoryItem={removeHistoryItem}
            />
        </div>
    )
}


SearchControl.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    history: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onClickHistoryItem: PropTypes.func.isRequired,
    removeHistoryItem: PropTypes.func.isRequired,
}

export default React.memo(SearchControl);