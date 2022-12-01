import { ConferenceStore } from "@features/Room";

import handlerConference from "./handlerConference";

const handlerDataConferencesIntoStates = data => {
    return data.body.conferences
        .map(item => handlerConference(item))
        .map(item => new ConferenceStore(item));
}

export default handlerDataConferencesIntoStates;