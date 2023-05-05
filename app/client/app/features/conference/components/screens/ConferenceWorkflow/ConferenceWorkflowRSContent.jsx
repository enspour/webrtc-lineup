import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import ConferenceChat from '../ConferenceChat/ConferenceChat';

import services from '@services';

const ConferenceWorkflowRSContent = observer(() => {
    const type = services.conference.Workflow.TypeRS;

    useEffect(() => {
        if (type === services.conference.Workflow.TypeMain) {
            services.conference.Workflow.closeRS();
        }
    }, []);

    if (type === "chat") {
        return <ConferenceChat height="calc(100vh - 5rem - 4rem - 2rem)"/>;
    }

    return null;
});

export default ConferenceWorkflowRSContent;