import { nanoid } from "nanoid";

import { repository } from "core/postgresql/src/connection";

class ConferenceService {
    async findByIdPrivilege(id: string) {
        return await repository.findConferenceByIdPrivilege(id);
    } 

    async create(roomId: bigint, userId: bigint, name: string, description: string) {
        const conferenceId = nanoid();
        return await repository.createConference(conferenceId, name, description, roomId, userId);
    }

    async delete(conferenceId: string, userId: bigint) {
        return await repository.deleteConference(conferenceId, userId);
    }

    async updateName(id: string, userId: bigint, name: string): Promise<number> {
        return await repository.updateConferenceName(id, userId, name);
    }

    async updateDescription(id: string, userId: bigint, description: string): Promise<number> {
        return await repository.updateConferenceDescription(id, userId, description);
    }

    async updateEnableAudio(conferenceId: string, userId: bigint, enableAudio: boolean) {
        return await repository.updateConferenceSettingsEnableAudio(conferenceId, userId, enableAudio);
    }

    async updateEnableVideo(conferenceId: string, userId: bigint, enableVideo: boolean) {
        return await repository.updateConferenceSettingsEnableVideo(conferenceId, userId, enableVideo);
    }
}

export default new ConferenceService;