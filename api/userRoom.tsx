import {get, post} from "../utils/fetch";

export const userRoomInfo = () => {
    return get("/api/userRoom/info")
}

export const userJoinRoom = (param) => {
    return post("/api/userRoom/join", param)
}

export const userQuitRoom = (param) => {
    return post("/api/userRoom/quit", param)
}

export const createQrToken = () => {
    return get("/api/userRoom/qr/token")
}

export const userJoinRoomByToken = (param) => {
    return post("/api/userRoom/qr/join", param)
}

export const userKickOut = (param) => {
    return post("/api/userRoom/kickOut", param)
}

export const userSetOwner = (param) => {
    return post("/api/userRoom/owner", param)
}

export const userSetDealers = (param) => {
    return post("/api/userRoom/dealers", param)
}

