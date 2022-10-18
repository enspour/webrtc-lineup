import React from "react";
import PropTypes from "prop-types";

import useOutsideAlerter from "@hooks/useOutsideAlerter";

import Svg from "../Svg/Svg";

import ClearIcon from "@assets/images/search/clear.svg";

import styles from "./SearchControl.module.scss";

const SearchHelper = ({ 
    isOpen, 
    setIsOpen, 
    text, 
    setText,
    history, 
    pushHistoryItem, 
    removeHistoryItem 
}) => {
    const items = React.useMemo(() =>
        history.filter(item => item.startsWith(text) && item !== text)
    , [text, history])

    const remove = (e, text) => {
        e.stopPropagation();
        removeHistoryItem(text);
    }

    const push = (text) => {
        setTimeout(() => {
            setText(text);
            pushHistoryItem(text);
            setIsOpen(false);
        }, 0)
    }

    if (!isOpen || items.length === 0) return ""; 
    
    return (
        <div className={styles.search__helper}>
            {
                items.map(item => 
                    <div 
                        key={item}
                        className={styles.search__helper__item} 
                        onClick={() => push(item)}
                    >
                        <span>{item}</span>

                        <Svg
                            url={ClearIcon} 
                            height="1.4" 
                            width="1.4" 
                            onClick={e => remove(e, item)}
                        />
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

            <Svg url={ClearIcon} height="1.4" width="1.4" onClick={() => setValue("")}/>
        </div>
    )
}

const SearchControl = ({ placeholder, value, setValue, history, pushHistoryItem, removeHistoryItem }) => {
    const [ref, isOpen, setIsOpen] = useOutsideAlerter(false);

    return (
        <div className={styles.search} ref={ref} onClick={() => setIsOpen(true)}>
            <SearchInput placeholder={placeholder} value={value} setValue={setValue}/>
            <SearchHelper 
                text={value} 
                setText={setValue}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                history={history}
                pushHistoryItem={pushHistoryItem}
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
    pushHistoryItem: PropTypes.func.isRequired,
    removeHistoryItem: PropTypes.func.isRequired,
}

export default React.memo(SearchControl);