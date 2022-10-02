import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Panel from "../Panel/Panel";
import Svg from "../Svg/Svg";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import moreIcon from "@assets/images/room/more.svg";
import removeIcon from "@assets/images/room/remove.svg";

import services from "@services";

import styles from "./StoredRoomCard.module.scss";

const StoredRoomCard = observer(({ room }) => {
    const username = services.user.Name;
    
    const request = useRequest(services.roomAPI.delete);
    const { data } = useResponse(request);

    const remove = () => {
        request.start({ params: { id: room.id } });
    }

    React.useEffect(() => {
        if (data) services.userRooms.update();
    }, [data]);

    return (
        <div className={styles.card}>
            <Panel>
                <div className={styles.wrapper}>
                    <div className={styles.room}>
                        <div className={styles.room__info}>
                            <span> {room.name} </span>
                            <span className={styles.dash}></span>
                            <span className={styles.room__info__user}> {username} </span>
                        </div>

                        <div className={styles.room__controls}>
                            <Svg url={removeIcon} width="1.4" height="1.4" onClick={remove}/>
                            <Svg url={moreIcon} width="1.6" height=".4"/>
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
});

StoredRoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }).isRequired
        ).isRequired
    }).isRequired,
}

export default StoredRoomCard;