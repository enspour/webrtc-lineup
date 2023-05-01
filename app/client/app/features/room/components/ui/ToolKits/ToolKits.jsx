import { memo } from "react";

import ToolKitCard from "../ToolKitCard/ToolKitCard";

import styles from "./ToolKits.module.scss";

const ToolKits = () => {
    return (
        <div className={styles.tool__kits}>
            <ToolKitCard 
                title="File Storage" 
                hint="You can exchange files to conduct productive meetings here."
            />
        </div>
    );
}

export default memo(ToolKits);