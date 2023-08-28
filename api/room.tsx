import {post} from "../utils/axios";

export const createRoom = (roomInfo) => {
    return post("/api/room/create", roomInfo)
}
