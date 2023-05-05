import { useEffect, useState, useRef, useMemo, memo } from "react";
import { autorun } from "mobx";
import _debounce from "lodash/debounce";

import UserVideo from "../../ui/UserVideo/UserVideo";

import useSubscriberAtResizing from "@hooks/useSubscriberAtResizing";

import services from "@services";

import styles from "./ConferenceVideos.module.scss";

const MAX_NUMBER_USERS = 9;
const PADDINGS = 40;
const RATIO = 4 / 3;
const SCALE = 0.85;

const getGridOptions = (count) => {
    switch (count) {
        case 1: 
            return { columns: 1, rows: 1 }
        case 2:
            return { columns: 2, rows: 1 }
        case 3:
            return { columns: 3, rows: 1 }    
        case 4: 
            return { columns: 2, rows: 2 }
        case 5:
        case 6: 
            return { columns: 3, rows: 2 }  
        case 7:
        case 8:
        case 9:
            return { columns: 3, rows: 3 }
        default:
            return { columns: 1, rows: 1 }
    }
}

const getWidthHeightByElement = (element, paddings) => {
    const height = element.offsetHeight - paddings;
    const width = element.offsetWidth - paddings;

    return { width, height };
}

const getWidthHeightByRatio = (area, ratio) => {
    const height = Math.sqrt(area / ratio);
    const width = height * ratio;
    
    return { width, height };
}

const getMinTotalAreaByRatio = (width, height, ratio) => {
    const areaByWidth = width / ratio * width;
    const areaByHeight = height * ratio * height;

    return Math.min(areaByWidth, areaByHeight)
}

const getOptions = (parent, count) => {
    const gridOptions = getGridOptions(count);

    const { width, height } = getWidthHeightByElement(parent, PADDINGS);

    const totalArea = getMinTotalAreaByRatio(width / gridOptions.columns, height / gridOptions.rows, RATIO)
    
    const areaForElement = totalArea * SCALE;

    const elementOptions = getWidthHeightByRatio(areaForElement, RATIO);
    
    return { ...gridOptions, ...elementOptions };
}

const ConferenceVideos = () => {    
    const usersRef = useRef();

    const [options, setOptions] = useState({});
    
    const [users, setUsers] = useState([]);

    const updateOptions = () => {
        const target = usersRef.current;

        if (target) {
            setOptions(getOptions(target, users.length));
        }
    }

    const debouncedUpdateOptions = useMemo(
        () => _debounce(updateOptions, 250)
    , [users]);

    useSubscriberAtResizing(usersRef, debouncedUpdateOptions);

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
                .slice(0, MAX_NUMBER_USERS - 1)
                .map(item => ({
                    peerId: item.PeerId,
                    userId: item.UserId,
                    stream: item.RemoteMediaStream,
                    active: item.IsSpeaking,
                    muted: false,
                }));
    
            setUsers([local, ...peers]);
        })
    , []);

    return (
        <div ref={usersRef} className={styles.container}>
            <div 
                className={styles.users}
                style={{
                    gridTemplateColumns: `repeat(${options.columns}, ${options.width}px)`,
                    gridTemplateRows: `repeat(${options.rows}, ${options.height}px)`,
                }}
            > 
                { users.map(item => <UserVideo key={item.peerId} item={item} options={options}/>) }
            </div>
        </div>
    )
};

export default memo(ConferenceVideos);