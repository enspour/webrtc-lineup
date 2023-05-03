import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import ConferenceChat from '../ConferenceChat/ConferenceChat';

import services from '@services';

const ConferenceWorkflowLSContent = observer(() => {
    const type = services.conference.Workflow.TypeLS;

    useEffect(() => {
        if (type === services.conference.Workflow.TypeMain) {
            services.conference.Workflow.closeLS();
        }
    }, []);

    if (type === "chat") {
        return <ConferenceChat height="calc(100vh - 5rem - 4rem - 2rem)"/>;
    }

    return null;
});

export default ConferenceWorkflowLSContent;