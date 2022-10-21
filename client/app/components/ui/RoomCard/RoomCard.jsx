import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Panel from "../Panel/Panel";
import Svg from "../Svg/Svg";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import MoreIcon from "@assets/images/room/more.svg";
import RemoveIcon from "@assets/images/room/remove.svg";
import AddToFavoritesIcon from "@assets/images/room/addToFavorites.svg";
import RemoveToFavoritesIcon from "@assets/images/room/removeFromFavorites.svg";

import services from "@services";

import styles from "./RoomCard.module.scss";

const RemoveControl = ({ room }) => {
    const request = useRequest(services.roomAPI.delete);
    const { data } = useResponse(request);

    const remove = (e) => {
        e.stopPropagation();
        request.start({ params: { id: room.id } });
    }

    React.useEffect(() => {
        if (data) services.userRooms.update();
    }, [data]);

    return <Svg url={RemoveIcon} width="1.4" height="1.4" onClick={remove}/>;
}

const AddToFavoritesControl = ({ room }) => {
    const request = useRequest(services.roomAPI.addToFavorites);
    const { data } = useResponse(request);

    const add = (e) => {
        e.stopPropagation();
        request.start({ params: { id: room.id } });
    }

    React.useEffect(() => {
        if (data) services.userFavoritesRooms.update();
    }, [data])

    return <Svg url={AddToFavoritesIcon} width="2" height="1.8" onClick={add}/>
}

const RemoveFromFavoritesControl = ({ room }) => {
    const request = useRequest(services.roomAPI.deleteFromFavorites);
    const { data } = useResponse(request);

    const remove = (e) => {
        e.stopPropagation();
        request.start({ params: { id: room.id } });
    }

    React.useEffect(() => {
        if (data) services.userFavoritesRooms.update();
    }, [data])

    return <Svg url={RemoveToFavoritesIcon} width="2" height="1.8" onClick={remove}/>
}

const FavoritesControl = observer(({ room }) => {
    const favorites = services.userFavoritesRooms.Rooms;
    const isFavorites = favorites.find(item => item.id === room.id);

    if (isFavorites) {
        return <RemoveFromFavoritesControl room={room}/>
    }

    return <AddToFavoritesControl room={room}/>
});

const MultipleControl = observer(({ room }) => {
    const userId = services.user.Id;

    if (room.owner.id === userId) {
        return <RemoveControl room={room}/>
    }
    
    return <FavoritesControl room={room}/>
});

const Tags = ({ tags }) => {
    const searchByTags = (e, name) => {
        e.stopPropagation();
        services.island.goSearch();
        services.search.SearchedText = `#${name}`;
    }

    return tags.map(tag => (
        <div key={tag.id} className={styles.tag} onClick={(e) => searchByTags(e, tag.name)}>
            {tag.name}
        </div>
    ))
}

const RoomCard = ({ room }) => {
    const openRoomModal = () => {
        services.modals.room.IsOpen = true;
        services.modals.room.Room = room;
    }
    
    return (
        <div className={styles.card} onClick={openRoomModal}>
            <Panel>
                <div className={styles.room}>
                    <div className={styles.wrapper}>
                        <div className={styles.room__info}>
                            <span className={styles.room__info__name}> {room.name} </span>
                            <span className={styles.dash}></span>
                            <span className={styles.room__info__user}> {room.owner.name} </span>
                        </div>

                        <div className={styles.room__controls}>
                            <MultipleControl room={room}/>
                            <Svg url={MoreIcon} width="1.6" height=".4"/>
                        </div>
                    </div>
                    
                    <div className={styles.line}></div>

                    <div className={styles.tags}>
                        <Tags tags={room.tags}/>
                    </div>
                </div>
            </Panel>
        </div>
    )
};

RoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,

        tags: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }).isRequired
        ).isRequired,
        
        owner: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,

        createdAt: PropTypes.string.isRequired,
    }).isRequired,
}

export default React.memo(RoomCard);