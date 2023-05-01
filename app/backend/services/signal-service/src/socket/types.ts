export const RoomActionsTypes = {
    JOIN_ROOM: "room:join",
    NOTIFY_JOIN: "notify:room:join",

    LEAVE_ROOM: "room:leave",
    NOTIFY_LEAVE: "notify:room:leave",

    NOTIFY_USER_LEAVE: "notify:room:user_leave",
    NOTIFY_USER_JOIN: "notify:room:user_join",

    NOTIFY_UPDATE_ROOM_INFORMATION: "notify:room:info_update",
};

export const ConferenceActionsTypes = {
    JOIN_CONFERENCE: "conference:join",
    NOTIFY_JOIN_CONFERENCE: "notify:conference:join",

    LEAVE_CONFERENCE: "conference:leave",
    NOTIFY_LEAVE_CONFERENCE: "notify:conference:leave",

    NOTIFY_USER_JOIN_CONFERENCE: "notify:conference:user_join",
    NOTIFY_USER_LEAVE_CONFERENCE: "notify:conference:user_leave",

    NOTIFY_UPDATE_CONFERENCE_INFORMATION: "notify:conference:info_update",

    SEND_MESSAGE: "conference:chat:send:message",
    NOTIFY_SEND_MESSAGE: "notify:conference:chat:send:message",
    NOTIFY_NEW_MESSAGE: "notify:conference:chat:new:message",
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