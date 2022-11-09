import React from "react";
import { autorun } from "mobx";
import _debounce from "lodash/debounce";

import UserVideo from "../../ui/UserVideo/UserVideo";

import services from "@services";

import styles from "./VideosConferenceScreen.module.scss";

const getGridColumnsRows = count => {
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

const getGridOptions = (parent, count) => {
    const PADDINGS = 40;
    const RATIO = 4 / 3;
    const SCALE = 0.85;

    const options = getGridColumnsRows(count);

    const { width, height } = getWidthHeightByElement(parent, PADDINGS);

    const totalArea = getMinTotalAreaByRatio(width / options.columns, height / options.rows, RATIO)
    
    const areaForChild = totalArea * SCALE;

    const child = getWidthHeightByRatio(areaForChild, RATIO);
    
    return { ...options, child }
}

const VideosConferenceScreen = () => {
    const MAX_COUNT_VIDEOS = 9;
    
    const videosRef = React.useRef();

    const [videos, setVideos] = React.useState([]);
    const [gridOptions, setGridOptions] = React.useState({ child: {} });

    const updateGridOptions = () => {
        if (videosRef.current) {
            const count = videos.length;
            const options = getGridOptions(videosRef.current, count);
            setGridOptions(options)
        }
    }

    React.useEffect(() =>
        autorun(() => {
            const local = {
                peerId: "local",
                stream: services.userMedia.Stream,
                active: services.userMedia.IsSpeaking,
                muted: true,
            };
            
            const peers = services.conference.Peers;
            const remotePeers = [...peers]
                .sort((a, b) => b.LastAudioActive - a.LastAudioActive)
                .slice(0, MAX_COUNT_VIDEOS - 1)
                .map(item => ({
                    peerId: item.PeerId,
                    stream: item.Stream,
                    active: item.IsSpeaking,
                    muted: false,
                }));

            setVideos([ 
                local,  
                ...remotePeers 
            ]);
        })
    , [])

    React.useEffect(() => {
        updateGridOptions();

        const event = _debounce(updateGridOptions, 250);
        
        window.addEventListener("resize", event);
        return () => window.removeEventListener("resize", event);
    }, [videos])

    return (
        <div ref={videosRef} className={styles.videos}>
            <div 
                className={styles.videos__items}
                style={{
                    gridTemplateColumns: `repeat(${gridOptions.columns}, ${gridOptions.child.width}px)`,
                    gridTemplateRows: `repeat(${gridOptions.rows}, ${gridOptions.child.height}px)`,
                }}
            > 
                { videos.map(item => <UserVideo key={item.peerId} item={item} options={gridOptions.child}/>) }
            </div>
        </div>
    )
}

export default VideosConferenceScreen;