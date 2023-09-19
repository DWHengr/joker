import {get, post} from "../utils/fetch";

export const login = (loginInfo) => {
    return post("/api/login", loginInfo)
}

export const getUserPortrait = (userid) => {
    return get("/api/user/portrait", userid)
}

export const getUserProfile = () => {
    return get("/api/user/profile")
}
