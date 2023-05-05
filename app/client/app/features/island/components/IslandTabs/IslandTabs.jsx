import { observer } from "mobx-react-lite";

import { IslandViewTabs } from "@features/island/stores/Island.states";

import services from "@services";

import classes from "@utils/classes";

import styles from "./IslandTabs.module.scss";

const IslandTabs = observer(() => {
    const currentId = services.island.Tabs.CurrentId;

    const getClassName = (item) => {
        return classes(
            styles.tab, currentId === item.id ? styles.tab__active : ""
        );
    }

    return (
        <div className={styles.tabs}>
            {
                IslandViewTabs.map(item => 
                    <div 
                        key={item.id}
                        className={getClassName(item)}
                        onClick={() => item.open()}
                    >
                        {item.name}
                    </div>
                )
            } 
        </div> 
    )
});

export default IslandTabs;