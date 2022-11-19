import { observer } from "mobx-react-lite";

import services from "@services";

import styles from "./ContextMenu.module.scss";

const ContextMenu = observer(() => {
    const isOpen = services.contextMenu.IsOpen;
    const menu = services.contextMenu.Menu;
    const coordinates = services.contextMenu.Coordinates;

    if (!isOpen) return "";

    return (
        <div
            className={styles.context__menu}
            style={{
                top: coordinates.y,
                left: coordinates.x
            }}
        >
            { 
                menu.map(item => (
                    <div 
                        key={item.id} 
                        className={styles.context__menu__item} 
                        onClick={item.onClick.bind(item)}
                    >
                        { item.name }
                    </div>
                )) 
            }
        </div>
    )
});

export default ContextMenu