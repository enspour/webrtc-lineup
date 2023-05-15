import { observer } from 'mobx-react-lite'

import RoomCard from '@components/ui/RoomCard/RoomCard';

import services from '@services';

import styles from "./Search.module.scss"

const SearchResult = observer(() => {
    const rooms = services.island.Search.Rooms;

    if (rooms.length === 0) {
        return (
            <div className={styles.search__empty__result}>
                Извините, но комнаты не удалось найти, возможно, они скрыты.
            </div>
        )
    }

    return (
        <div className={styles.search}>
            <div className={styles.search__rooms}>
                { rooms.map(room => <RoomCard key={room.id} room={room}/>) }
            </div>
        </div>
    )
});

export default SearchResult;