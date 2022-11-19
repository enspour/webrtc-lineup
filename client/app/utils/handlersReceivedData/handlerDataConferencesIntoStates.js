import { ConferenceStore } from "@features/room";

import handlerConference from "./handlerConference";

const handlerDataConferencesIntoStates = data => {
    return data.body.conferences
        .map(item => handlerConference(item))
        .map(item => new ConferenceStore(item));
}

export default handlerDataConferencesIntoStates;