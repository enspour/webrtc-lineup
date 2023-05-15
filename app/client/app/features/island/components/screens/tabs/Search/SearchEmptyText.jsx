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
            <div>Введи текст и нажни на поиск, чтобы найти комнаты. Ты также можешь использовать теги для более точного поиска.</div>
            <div>
                <span>Пример:&nbsp;</span> 
                <span className={styles.search__example} onClick={run}>#lineup Lineup</span>
            </div>
        </div>
    )
}

export default memo(SearchEmptyText);