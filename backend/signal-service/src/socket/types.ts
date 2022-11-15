export const RoomActionsTypes = {
    GET_USERS: "room:get_users",
    NOTIFY_GET_USERS: "notify:room:get_users",

    JOIN_ROOM: "room:join",
    NOTIFY_JOIN: "notify:room:join",

    LEAVE_ROOM: "room:leave",
    NOTIFY_LEAVE: "notify:room:leave",

    NOTIFY_USER_LEAVE: "notify:room:user:leave",
    NOTIFY_USER_JOIN: "notify:room:user:join",

    NOTIFY_UPDATE_ROOM_INFORMATION: "notify:room:info:update",
};

export const ConferenceActionsTypes = {
    JOIN_CONFERENCE: "room:conference:join",
    NOTIFY_JOIN_CONFERENCE: "notify:room:conference:join",

    LEAVE_CONFERENCE: "room:conference:leave",
    NOTIFY_LEAVE_CONFERENCE: "notify:room:conference:leave",

    NOTIFY_USER_JOIN_CONFERENCE: "notify:room:conference:user:join",
    NOTIFY_USER_LEAVE_CONFERENCE: "notify:room:conference:user:leave",

    SEND_ICE_CANDIDATE: "room:conference:send_ice-candidate",
    NOTIFY_SEND_ICE_CANDIDATE: "notify:room:conference:send_ice-candidate",
    ACCEPT_ICE_CANDIDATE: "room:conference:accept_ice-candidate",

    SEND_OFFER: "room:conference:send_offer",
    NOTIFY_SEND_OFFER: "notify:room:conference:send_offer",
    ACCEPT_OFFER: "room:conference:accept_offer",

    SEND_ANSWER: "room:conference:send_answer",
    NOTIFY_SEND_ANSWER: "notify:room:conference:send_answer",
    ACCEPT_ANSWER: "room:conference:accept_answer",
};