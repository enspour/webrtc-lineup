import { useEffect, useState, useRef, useMemo, memo } from "react";
import { autorun } from "mobx";
import _debounce from "lodash/debounce";

import UserAudio from "../../ui/UserAudio/UserAudio";

import useSubscriberAtResizing from "@hooks/useSubscriberAtResizing";

import services from "@services";

import styles from "./ConferenceAudios.module.scss";

const PADDINGS = 40;
const ELEMENT_WIDTH = 250;
const ELEMENT_HEIGHT = 80;
const GAP = 20;

const getWidthHeightByElement = (element, paddings) => {
    const height = element.offsetHeight - paddings;
    const width = element.offsetWidth - paddings;

    return { width, height };
}

const getNumberUsers = (parent) => {
    const { width, height } = getWidthHeightByElement(parent, PADDINGS)

    const columns = width / (ELEMENT_WIDTH + GAP);
    const rows = height / (ELEMENT_HEIGHT + GAP);

    return columns * rows;
}

const ConferenceAudios = () => {
    const usersRef = useRef();
    
    const [users, setUsers] = useState([]);

    const [numberUsers, setNumberUsers] = useState(0);

    const updateNumberUsers = () => {
        const target = usersRef.current;

        if (target) {
            setNumberUsers(getNumberUsers(target))
        }
    }

    const debouncedUpdateNumberUsers = useMemo(
        () => _debounce(updateNumberUsers, 0)
    , []);

    useSubscriberAtResizing(usersRef, debouncedUpdateNumberUsers);

    useEffect(() =>
        autorun(() => {
            const local = {
                peerId: "local",
                userId: services.user.Info.Id,
                stream: services.user.Media.Stream,
                active: services.user.Media.IsSpeaking,
                muted: true,
            };
            
            const peers = [...services.conference.Peers]
                .sort((a, b) => b.LastAudioActive - a.LastAudioActive)
                .slice(0, numberUsers - 1)
                .map(item => ({
                    peerId: item.PeerId,
                    userId: item.UserId,
                    stream: item.RemoteMediaStream,
                    active: item.IsSpeaking,
                    muted: false,
                }));

            setUsers([local, ...peers]);
        })
    , [numberUsers]);

    return (
        <div ref={usersRef} className={styles.container}>
            <div className={styles.users}> 
                { users.map(item => <UserAudio key={item.peerId} item={item}/>) }
            </div>
        </div>
    )
}

export default memo(ConferenceAudios);