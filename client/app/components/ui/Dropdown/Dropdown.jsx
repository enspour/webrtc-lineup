import React from "react";
import PropTypes from "prop-types";

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

Dropdown.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        }).isRequired
    ).isRequired,
}

export default React.memo(Dropdown);