import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";

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
    const router = useRouter();
    
    const peers = services.conference.Peers;

    const leave = async () => {
        const response = await services.conference.leave();
        console.log(response);
        router.push("/room");
    }

    return (
        <div>
            <div> 
                { peers.map(item => <RemoteVideo key={item.remotePeerId} item={item}/>) }
            </div>
            <OutlinedButton onClick={leave}>
                Leave
            </OutlinedButton>
        </div>
    )
})

export default Conference;