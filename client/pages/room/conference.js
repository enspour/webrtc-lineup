import React from "react";
import { observer } from "mobx-react-lite";

import ConferenceLayout from "@components/layouts/ConferenceLayout/ConferenceLayout";

import services from "@services";

const RemoteVideo = ({ item }) => {
    const ref = React.useRef();

    React.useEffect(() => {
        if (ref.current) {
            ref.current.srcObject = item.remoteStream;
        }
    }, [])

    return (
        <div> <video ref={ref} autoPlay/> </div>
    )
}

const Conference = observer(() => {
    const peers = services.conference.Peers;

    return (
        <ConferenceLayout>
            <div> 
                { peers.map(item => <RemoteVideo key={item.remotePeerId} item={item}/>) }
            </div>
        </ConferenceLayout>
    )
})

export default Conference;