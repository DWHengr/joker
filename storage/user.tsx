import {getObjectValue, getStringValue, removeValue, setObjectValue, setStringValue} from "../utils/storage";

const token = "token";
const userInfo = "userInfo";
const userId = "userId";

export async function getToken() {
    return await getStringValue(token)
}

export function setToken(value: string) {
    setStringValue(token, value).then();
}

export async function getUserId() {
    return await getStringValue(userId)
}

export function setUserId(value: string) {
    setStringValue(userId, value).then();
}

export async function getUserInfo() {
    return await getObjectValue(userInfo)
}

export function setUserInfo(value: any) {
    setObjectValue(userInfo, value).then();
}

export function removeToken() {
    removeValue(token).then();
}
