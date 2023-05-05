import { observer } from "mobx-react-lite";

import ConferenceLayout from "../../layouts/ConferenceLayout/ConferenceLayout";
import ConferenceWorkflow from "../../screens/ConferenceWorkflow/ConferenceWorkflow";

const ConferencePage = observer(() => {
    return (
        <ConferenceLayout>
            <ConferenceWorkflow />
        </ConferenceLayout>
    )
});

export default ConferencePage;