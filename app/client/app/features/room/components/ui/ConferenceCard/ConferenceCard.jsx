import { useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import ConferenceAPI from "@api/ConferenceAPI";

import Panel from "@components/ui/Panel/Panel";
import Svg from "@components/ui/Svg/Svg";

import useContextMenu from "@hooks/useContextMenu";
import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import services from "@services";

import CameraIcon from "@assets/images/conference-card/cam.svg";
import CameraOffIcon from "@assets/images/conference-card/cam-off.svg";
import MicrophoneIcon from "@assets/images/conference-card/mic.svg";
import MicrophoneOffIcon from "@assets/images/conference-card/mic-off.svg";
import PeopleIcon from "@assets/images/conference-card/people.svg";

import styles from "./ConferenceCard.module.scss";

const BottomPanelVideo = observer(({ conference }) => {
    const settings = conference.settings;

    return (
        <div>
            {
                settings.enableVideo
                    ? <Svg url={CameraIcon} width="1.5" height=".9"/>
                    : <Svg url={CameraOffIcon} width="1.5" height="1.5"/>
            }
        </div>
    )
});

const BottomPanelAudio = observer(({ conference }) => {
    const settings = conference.settings;

    return (
        <div className={styles.card__bottom__panel__mic}>
            { 
                settings.enableAudio 
                    ? <Svg url={MicrophoneIcon} width="1" height="1.3"/>
                    : <Svg url={MicrophoneOffIcon} width="1.2" height="1.3"/> 
            }
        </div>
    )
});

const BottomPanel = ({ conference }) => {
    return (
        <div className={styles.card__bottom__panel}>
            <div className="fl al-center">
                <Svg url={PeopleIcon} width="1.1" height="1.1"/>
                <div>1</div>
            </div>

            <div className="fl al-center g-1">
                <BottomPanelAudio conference={conference}/>
                <BottomPanelVideo conference={conference}/>
            </div>
        </div>
    )
}

const ConferenceCard = observer(({ conference }) => {
    const router = useRouter();

    const request = useRequest(ConferenceAPI.delete);
    const { data } = useResponse(request);

    const [cardRef, appendMenu] = useContextMenu();

    const deleteConference = () => {
        request.start({ params: { id: conference.id } })
    }

    const openConference = async () => {
        const constraints = { 
            audio: conference.settings.enableAudio, 
            video: conference.settings.enableVideo, 
        };

        const response = await services.conference.join(conference, constraints);
        if (response.status === 200) {
            const roomId = services.room.Info.Id;
            const conferenceId = conference.id;
            router.push(`/room/${roomId}/conference/${conferenceId}`);
        }
    }

    const openSettings = () => {
        services.modals.browseConferenceSettings.setData(conference);
        services.modals.browseConferenceSettings.open();
    }

    useEffect(() => {
        appendMenu({ id: 1, name: "Присоединиться", onClick: openConference });

        if (services.room.Info.Owner.id === services.user.Info.Id) {
            appendMenu({ id: 2, name: "Удалить", onClick: deleteConference });
            appendMenu({ id: 3, name: "Настройки", onClick: openSettings });
        }
    }, [])

    useEffect(() => {
        if (data && data.status === 200) {
            services.room.Conferences.update()
        }
    }, [data])

    return (
        <div ref={cardRef} className={styles.card} onClick={openConference}>
            <Panel height="12.5rem" width="30rem" overflow="hidden">
                <div className={styles.wrapper}>
                    <div>
                        <div className={styles.card__name}>{ conference.name }</div>
                        <div className={styles.card__description}>
                            {
                                conference.description 
                                || `Нажми, чтобы присоединиться к конференции.`
                            }
                        </div>
                    </div>

                    <BottomPanel conference={conference}/>
                </div>
            </Panel>
        </div>
    )
})

export default ConferenceCard;