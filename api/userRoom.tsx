import {get} from "../utils/fetch";

export const userRoomInfo = () => {
    return get("/api/userRoom/info")
}
