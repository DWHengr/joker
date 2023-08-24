import {get, post} from "../utils/axios";

export const login = (loginInfo) => {
    return post("/api/login", loginInfo)
}

export const getUserPortrait = (userid) => {
    return get("/api/user/portrait", userid)
}
