import React from "react";
import { autorun } from "mobx";
import _debounce from "lodash/debounce";

import UserAudio from "../UserAudio/UserAudio";

import services from "@services";

import styles from "./ConferenceAudios.module.scss";

const getWidthHeightByElement = (element, paddings) => {
    const height = element.offsetHeight - paddings;
    const width = element.offsetWidth - paddings;

    return { width, height };
}

const getMaxCountAudios = (parent) => {
    const PADDINGS = 40;
    const ELEMENT_WIDTH = 250;
    const ELEMENT_HEIGHT = 80;
    const GAP = 20;

    const { width, height } = getWidthHeightByElement(parent, PADDINGS)

    const columns = width / (ELEMENT_WIDTH + GAP);
    const rows = height / (ELEMENT_HEIGHT + GAP);

    return columns * rows;
}

const ConferenceAudios = () => {
    const audiosRef = React.useRef();
    
    const [maxCountAudios, setMaxCountAudios] = React.useState(1);
    const [audios, setAudios] = React.useState([]);

    const updateMaxCountAudios = () => {
        if (audiosRef.current) {
            setMaxCountAudios(getMaxCountAudios(audiosRef.current))
        }
    } 

    React.useEffect(() =>
        autorun(() => {
            const local = {
                peerId: "local",
                userId: services.user.Info.Id,
                stream: services.user.Media.Stream,
                active: services.user.Media.IsSpeaking,
                muted: true,
            };
            
            const remotePeers = [...services.conference.Peers]
                .sort((a, b) => b.LastAudioActive - a.LastAudioActive)
                .slice(0, maxCountAudios - 1)
                .map(item => ({
                    peerId: item.PeerId,
                    userId: item.UserId,
                    stream: item.RemoteMediaStream,
                    active: item.IsSpeaking,
                    muted: false,
                }));

            setAudios([
                local,  
                ...remotePeers 
            ]);
        })
    , [maxCountAudios])

    React.useEffect(() => {
        updateMaxCountAudios();

        const event = _debounce(updateMaxCountAudios, 250);
        
        window.addEventListener("resize", event);
        return () => window.removeEventListener("resize", event);
    }, [])

    return (
        <div ref={audiosRef} className={styles.audios}>
            <div className={styles.audios__items}> 
                { audios.map(item => <UserAudio key={item.peerId} item={item}/>) }
            </div>
        </div>
    )
}

export default React.memo(ConferenceAudios);