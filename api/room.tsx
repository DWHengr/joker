import {post} from "../utils/fetch";

export const createRoom = (roomInfo) => {
    return post("/api/room/create", roomInfo)
}
