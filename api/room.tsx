import {get, post} from "../utils/fetch";

export const createRoom = (roomInfo) => {
    return post("/api/room/create", roomInfo)
}

export const roomInfoByCurrentUser = () => {
    return get("/api/room/user")
}
