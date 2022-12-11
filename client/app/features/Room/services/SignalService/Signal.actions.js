export default {
    GET_USERS: "room:get_users",
    NOTIFY_GET_USERS: "notify:room:get_users",

    JOIN_ROOM: "room:join",
    NOTIFY_JOIN: "notify:room:join",

    LEAVE_ROOM: "room:leave",
    NOTIFY_LEAVE: "notify:room:leave",

    NOTIFY_USER_LEAVE: "notify:room:user_leave",
    NOTIFY_USER_JOIN: "notify:room:user_join",

    NOTIFY_UPDATE_ROOM_INFORMATION: "notify:room:info_update",
    NOTIFY_UPDATE_CONFERENCE_INFORMATION: "notify:conference:info_update",
    

    JOIN_CONFERENCE: "room:conference:join",
    NOTIFY_JOIN_CONFERENCE: "notify:room:conference:join",

    LEAVE_CONFERENCE: "room:conference:leave",
    NOTIFY_LEAVE_CONFERENCE: "notify:room:conference:leave",

    NOTIFY_USER_JOIN_CONFERENCE: "notify:room:conference:user_join",
    NOTIFY_USER_LEAVE_CONFERENCE: "notify:room:conference:user_leave",

    SEND_ICE_CANDIDATE: "room:conference:send_ice-candidate",
    NOTIFY_SEND_ICE_CANDIDATE: "notify:room:conference:send_ice-candidate",
    ACCEPT_ICE_CANDIDATE: "room:conference:accept_ice-candidate",

    SEND_OFFER: "room:conference:send_offer",
    NOTIFY_SEND_OFFER: "notify:room:conference:send_offer",
    ACCEPT_OFFER: "room:conference:accept_offer",

    SEND_ANSWER: "room:conference:send_answer",
    NOTIFY_SEND_ANSWER: "notify:room:conference:send_answer",
    ACCEPT_ANSWER: "room:conference:accept_answer",

    
    SEND_MESSAGE: "chat:send:message",
    NOTIFY_SEND_MESSAGE: "notify:chat:send:message",
    NOTIFY_NEW_MESSAGE: "notify:chat:new:message",
}