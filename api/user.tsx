import {post} from "../utils/axios";

export const login = (loginInfo) => {
    return post("/api/login", loginInfo)
}

