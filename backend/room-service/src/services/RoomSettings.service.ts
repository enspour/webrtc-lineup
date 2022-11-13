import { repository } from "core/database/src/connection";

class RoomSettingsService {
    async updateVisibility(roomId: bigint, userId: bigint, visibility: boolean) {
        return await repository.updateRoomSettingsVisibility(roomId, userId, visibility);
    }

    async updateEnableAudio(roomId: bigint, userId: bigint, enableAudio: boolean) {
        return await repository.updateRoomSettingsEnableAudio(roomId, userId, enableAudio);
    }

    async updateEnableVideo(roomId: bigint, userId: bigint, enableVideo: boolean) {
        return await repository.updateRoomSettingsEnableVideo(roomId, userId, enableVideo);
    }
}

export default new RoomSettingsService;