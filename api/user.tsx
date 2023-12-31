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

export const modifyName = (nameInfo) => {
    return post("/api/user/modify/name", nameInfo)
}

export const modifyPassword = (param) => {
    return post("/api/user/modify/password", param)
}
