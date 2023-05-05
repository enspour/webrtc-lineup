export const RoomActionsTypes = {
    ROOM_JOIN: "room:join",
    NOTIFY_ROOM_JOIN: "notify:room:join",

    ROOM_LEAVE: "room:leave",
    NOTIFY_ROOM_LEAVE: "notify:room:leave",

    NOTIFY_ROOM_USER_JOINED: "notify:room:user_joined",
    NOTIFY_ROOM_USER_LEFT: "notify:room:user_left",

    NOTIFY_ROOM_INFO_UPDATED: "notify:room:info_updated",
};

export const ConferenceActionsTypes = {
    JOIN_CONFERENCE: "conference:join",
    NOTIFY_JOIN_CONFERENCE: "notify:conference:join",

    LEAVE_CONFERENCE: "conference:leave",
    NOTIFY_LEAVE_CONFERENCE: "notify:conference:leave",

    NOTIFY_CONFERENCE_USER_JOINED: "notify:conference:user_joined",
    NOTIFY_CONFERENCE_USER_LEFT: "notify:conference:user_left",

    NOTIFY_CONFERENCE_INFO_UPDATED: "notify:conference:info_updated",

    SEND_MESSAGE_CONFERENCE_CHAT: "conference:chat:send_message",
    NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT: "notify:conference:chat:send_message",
    NOTIFY_CONFERENCE_CHAT_NEW_MESSAGE: "notify:conference:chat:new_message",
};

export const MediaPeersConnectionActionsTypes = {
    SEND_ICE_CANDIDATE: "channel:send_ice-candidate",
    NOTIFY_SEND_ICE_CANDIDATE: "notify:channel:send_ice-candidate",
    ACCEPT_ICE_CANDIDATE: "channel:accept_ice-candidate",

    SEND_OFFER: "channel:send_offer",
    NOTIFY_SEND_OFFER: "notify:channel:send_offer",
    ACCEPT_OFFER: "channel:accept_offer",

    SEND_ANSWER: "channel:send_answer",
    NOTIFY_SEND_ANSWER: "notify:channel:send_answer",
    ACCEPT_ANSWER: "channel:accept_answer",
}