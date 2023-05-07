import { memo } from 'react'

import services from '@services';

import styles from "./Search.module.scss";

const SearchEmptyText = () => {
    const run = () => {
        services.island.Search.Text = "#lineup Lineup";
        services.island.Search.update();
    }

    return (
        <div className={styles.search__empty__text}>
            <div>Type in some text to find rooms. You can also use tags for a more precise search.</div>
            <div>
                <span>Example:&nbsp;</span> 
                <span className={styles.search__example} onClick={run}>#lineup Lineup</span>
            </div>
        </div>
    )
}

export default memo(SearchEmptyText);