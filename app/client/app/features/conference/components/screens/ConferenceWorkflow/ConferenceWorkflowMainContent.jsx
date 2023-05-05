import { observer } from 'mobx-react-lite';

import ConferenceChat from '../ConferenceChat/ConferenceChat';
import ConferenceVideos from '../ConferenceVideos/ConferenceVideos';
import ConferenceAudios from '../ConferenceAudios/ConferenceAudios';

import services from '@services';

const ConferenceWorkflowMainContent = observer(() => {
    const type = services.conference.Workflow.TypeMain;

    if (type === "video") {
        return <ConferenceVideos />;
    }

    if (type === "audio") {
        return <ConferenceAudios />;
    }

    if (type === "chat") {
        return <ConferenceChat />;
    }

    return null;
})

export default ConferenceWorkflowMainContent