import React from "react";

import styles from "./Dropdown.module.scss";

const Item = ({ item }) => {
    return (
        <div className={styles.dropdown__item} onClick={() => item.onClick()}>
            { item.name }
        </div>
    )
}

const Dropdown = ({ isOpen, items }) => {
    if (!isOpen)
        return "";

    return (
        <div className={styles.dropdown}>
            { items.map(item => <Item key={item.id} item={item}/>) }
        </div>
    );
}

export default React.memo(Dropdown);