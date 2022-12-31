import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import RoomAPI from "@api/RoomAPI";

import Panel from "../Panel/Panel";
import Svg from "../Svg/Svg";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import MoreIcon from "@assets/images/room-card/more.svg";
import RemoveIcon from "@assets/images/room-card/remove.svg";
import AddToFavoritesIcon from "@assets/images/room-card/addToFavorites.svg";
import RemoveToFavoritesIcon from "@assets/images/room-card/removeFromFavorites.svg";

import services from "@services";

import styles from "./RoomCard.module.scss";

const RemoveControl = ({ room }) => {
    const request = useRequest(RoomAPI.delete);
    const { data } = useResponse(request);

    const remove = (e) => {
        e.stopPropagation();
        request.start({ params: { id: room.id } });
    }

    React.useEffect(() => {
        if (data) services.userRooms.update();
    }, [data]);

    return (
        <Svg 
            url={RemoveIcon} 
            width="1.1" 
            height="1.1" 
            onClick={remove}
            color={"var(--theme-icon-secondary)"}
        />
    )
}

const AddToFavoritesControl = ({ room }) => {
    const request = useRequest(RoomAPI.addToFavorites);
    const { data } = useResponse(request);

    const add = (e) => {
        e.stopPropagation();
        request.start({ params: { id: room.id } });
    }

    React.useEffect(() => {
        if (data) services.userFavoritesRooms.update();
    }, [data])

    return (
        <Svg 
            url={AddToFavoritesIcon} 
            width="1.6" 
            height="1.4" 
            onClick={add}
            color={"var(--theme-icon-secondary)"}
        />
    )
}

const RemoveFromFavoritesControl = ({ room }) => {
    const request = useRequest(RoomAPI.deleteFromFavorites);
    const { data } = useResponse(request);

    const remove = (e) => {
        e.stopPropagation();
        request.start({ params: { id: room.id } });
    }

    React.useEffect(() => {
        if (data) services.userFavoritesRooms.update();
    }, [data])

    return (
        <Svg 
            url={RemoveToFavoritesIcon} 
            width="1.6" 
            height="1.4" 
            onClick={remove} 
            color={"var(--theme-icon-secondary)"}
        />
    );
}

const FavoritesControl = observer(({ room }) => {
    const favorites = services.userFavoritesRooms.Array;
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
        <div key={tag.id} className={styles.room__tag} onClick={(e) => searchByTags(e, tag.name)}>
            {tag.name}
        </div>
    ))
}

const RoomCard = ({ room }) => {
    const openRoomModal = () => {
        services.modals.browseRoom.setRoom(room);
        services.modals.browseRoom.setIsOpen(true);
    }
    
    return (
        <div className={styles.card} onClick={openRoomModal}>
            <Panel>
                <div className={styles.room}>
                    <div className="fl g-2">
                        <div className={styles.room__tags}>
                            <Tags tags={room.tags}/>
                        </div>

                        <div className={styles.room__controls}>
                            <MultipleControl room={room}/>
                            <Svg url={MoreIcon} width="1.6" height=".4" color={"var(--theme-icon-secondary)"}/>
                        </div>
                    </div>

                    <div className={styles.room__name}> {room.name} </div>
                    <div className={styles.room__author__name}> {room.owner.name} </div>
                </div>
            </Panel>
        </div>
    )
};

RoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,

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