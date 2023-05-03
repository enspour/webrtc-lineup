import { observer } from 'mobx-react-lite';

import services from '@services';

import styles from "./ConferenceWorkflow.module.scss";

const ConferenceWorkflowSidebar = observer(({ children, location }) => {
    const isOpen = location === "left" 
        ? services.conference.Workflow.IsOpenLS 
        : services.conference.Workflow.IsOpenRS

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.sidebar__open : ""}`}>
            <div className={styles[`sidebar__${location}`]}>
                {children}
            </div>
        </div>
    )
});

export default ConferenceWorkflowSidebar;