import { observer } from 'mobx-react-lite';

import ConferenceWorkflowSidebar from './ConferenceWorkflowSidebar';
import ConferenceWorkflowMainContent from './ConferenceWorkflowMainContent';
import ConferenceWorkflowRSContent from './ConferenceWorkflowRSContent';
import ConferenceWorkflowLSContent from './ConferenceWorkflowLSContent';

import services from '@services';

import styles from "./ConferenceWorkflow.module.scss";

const ConferenceWorkflow = observer(() => {
    const id = services.conference.Info.Id;

    if (!id) return null;

    return (
        <div className={styles.workflow}>
            <ConferenceWorkflowSidebar location="left"> 
                <ConferenceWorkflowLSContent />
            </ConferenceWorkflowSidebar>

            <div className={styles.main}>
                <ConferenceWorkflowMainContent />
            </div>
            
            <ConferenceWorkflowSidebar location="right">
                <ConferenceWorkflowRSContent />
            </ConferenceWorkflowSidebar>
        </div>
    )
});

export default ConferenceWorkflow