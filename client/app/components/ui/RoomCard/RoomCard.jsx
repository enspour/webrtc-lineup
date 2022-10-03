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

import services from "@services";

import styles from "./RoomCard.module.scss";

const RemoveControl = ({ room }) => {
    const request = useRequest(services.roomAPI.delete);
    const { data } = useResponse(request);

    const remove = () => {
        request.start({ params: { id: room.id } });
    }

    React.useEffect(() => {
        if (data) services.userRooms.update();
    }, [data]);

    return <Svg url={RemoveIcon} width="1.4" height="1.4" onClick={remove}/>;
}

const AddToFavoritesControl = ({ room }) => {
    return <Svg url={AddToFavoritesIcon} width="2" height="1.8"/>
} 

const MultipleControl = observer(({ room }) => {
    const userId = services.user.Id;

    if (room.owner.id === userId) {
        return <RemoveControl room={room}/>
    } else {
        return <AddToFavoritesControl room={room}/>
    }
});

const RoomCard = ({ room }) => {
    return (
        <div className={styles.card}>
            <Panel>
                <div className={styles.room}>
                    <div className={styles.wrapper}>
                        <div className={styles.room__info}>
                            <span> {room.name} </span>
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
                        {
                            room.tags.map(tag => (
                                <div key={tag.id} className={styles.tag}>
                                    {tag.name}
                                </div>
                            ))
                        }
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
    }).isRequired,
}

export default React.memo(RoomCard);