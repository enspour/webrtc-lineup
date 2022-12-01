import { observer } from "mobx-react-lite";

import ConferenceLayout from "../../layouts/ConferenceLayout/ConferenceLayout";

import ConferenceVideos from "../../ui/ConferenceVideos/ConferenceVideos";
import ConferenceAudios from "../../ui/ConferenceAudios/ConferenceAudios";
import ConferenceChat from "../../ui/ConferenceChat/ConferenceChat";

import services from "@services";

const ConferencePage = observer(() => {
    const settings = services.conference.Info.Settings;

    return (
        <ConferenceLayout>
            {
                settings.enableVideo 
                    ? <ConferenceVideos />
                    : settings.enableAudio
                        ? <ConferenceAudios />
                        : <ConferenceChat />
            }
        </ConferenceLayout>
    )
});

export default ConferencePage;