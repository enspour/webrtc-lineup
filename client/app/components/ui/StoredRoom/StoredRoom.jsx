import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Panel from "../Panel/Panel";
import Svg from "../Svg/Svg";

import useRequest from "@hooks/useRequest";
import useResponse from "@hooks/useResponse";

import moreIcon from "@assets/images/room/more.svg";
import removeIcon from "@assets/images/room/remove.svg";

import services from "@services";

import styles from "./StoredRoom.module.scss";

const StoredRoom = observer(({ room }) => {
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
        <div className={styles.room}>
            <Panel>
                <div className={styles.wrapper}>
                    <div className={styles.info}>
                        <div className={styles.info__name}>
                            <span> {room.name} </span>
                            <span className={styles.info__line}></span>
                            <span className={styles.info__username}> {username} </span>
                        </div>

                        <div className={styles.controls}>
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

StoredRoom.propTypes = {
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

export default StoredRoom;