import { observer } from "mobx-react-lite";

import Svg from "@components/ui/Svg/Svg";

import services from "@services";

import ClearIcon from "@assets/images/search/clear.svg";
import SearchIcon from "@assets/images/search/search.svg";

import styles from "./IslandSearch.module.scss";

const IslandSearchInput = observer(({ placeholder }) => {
    const text = services.island.Search.Text;

    const setText = (text) => services.island.Search.Text = text;

    const clear = () => setText("");

    const search = () => {
        services.island.Search.History.push(text);
        services.island.Search.update();
    }

    return (
        <div className={styles.input}>
            <input
                type="text"
                placeholder={placeholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            
            <div className={styles.input__controls}>
                <Svg url={ClearIcon} height="1.4" width="1.4" onClick={clear}/>
                <Svg url={SearchIcon} height="1.8" width="1.8" onClick={search}/>
            </div>
        </div>
    )
});

export default IslandSearchInput;