import {get} from "../utils/axios";

export const userRoomInfo = () => {
    return get("/api/userRoom/info")
}
