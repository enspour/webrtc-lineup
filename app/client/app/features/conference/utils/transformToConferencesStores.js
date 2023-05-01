import ConferenceStore from "../stores/Conference.store";

import transformToConference from "./transformToConference";

const transformToConferencesStores = conferences => {
    return conferences
        .map(item => transformToConference(item))
        .map(item => new ConferenceStore(item));
}

export default transformToConferencesStores;