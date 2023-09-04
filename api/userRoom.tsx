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
