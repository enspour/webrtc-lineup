import { nanoid } from "nanoid";

import { repository } from "core/database/src/connection";

const CONFERENCE_ID_LENGTH = 12;

class ConferenceService {
    async findConferenceByIdPrivilege(id: string) {
        return await repository.findConferenceByIdPrivilege(id);
    } 

    async create(roomId: bigint, userId: bigint, name: string, description: string) {
        const conferenceId = `${roomId}|${nanoid(CONFERENCE_ID_LENGTH)}`;
        return await repository.createConference(conferenceId, name, description, roomId, userId);
    }

    async delete(conferenceId: string, userId: bigint) {
        return await repository.deleteConference(conferenceId, userId);
    }

    async updateEnableAudio(conferenceId: string, userId: bigint, enableAudio: boolean) {
        return await repository.updateConferenceSettingsEnableAudio(conferenceId, userId, enableAudio);
    }

    async updateEnableVideo(conferenceId: string, userId: bigint, enableVideo: boolean) {
        return await repository.updateConferenceSettingsEnableVideo(conferenceId, userId, enableVideo);
    }
}

export default new ConferenceService;